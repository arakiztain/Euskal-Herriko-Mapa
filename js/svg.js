import { handleMapClick } from './clickMapa.js';
import { normalizeText, provinceColors, suggestMunicipalities } from './utils.js';

export async function loadMap() {
    fetch(`mapa.svg?timestamp=${new Date().getTime()}`)
        .then(response => response.text())
        .then(svg => {
            document.getElementById('mapa-container').innerHTML = svg;

            const svgElement = document.querySelector('svg');
            const savedColors = JSON.parse(localStorage.getItem('coloresMunicipios')) || {};
            const availableMunicipalities = new Set();

            document.querySelectorAll('path').forEach(path => {
                if (path.id && !path.id.includes('path')) {
                    availableMunicipalities.add(path.id);
                }
            });

            function applySavedColors() {
                Object.keys(savedColors).forEach(id => {
                    const paths = document.querySelectorAll(`path[id="${id}"]`);
                    paths.forEach(path => path.style.fill = savedColors[id]);
                });
            }

            //Udalerriek eta margoek eguneratu
            function updateList() {
                const provinceListElement = document.getElementById('province-list');
                const titleElement = document.getElementById('title');
                provinceListElement.innerHTML = '';

                //Bateratute
                const groupedProvinces = {};

                //Lurralde guztiek hartu svg-ko g-gaz
                const provinceGroups = document.querySelectorAll('g');

                provinceGroups.forEach(provinceGroup => {
                    const provinceId = provinceGroup.id;

                    //Lurraldeko udalerri guztiek
                    const municipalitiesInProvince = Array.from(provinceGroup.querySelectorAll('path'))
                        .map(path => path.id);

                    //Margoztute dauzenak
                    const selectedMunicipalities = municipalitiesInProvince.filter(id => savedColors[id] === provinceColors[provinceId]);

                    //Bikoitzak kendu (Set)
                    const uniqueMunicipalities = [...new Set(selectedMunicipalities)];

                    const totalMunicipalities = [...new Set(municipalitiesInProvince.filter(municipality => !municipality.includes("path")))];

                    if (!groupedProvinces[provinceId]) {
                        groupedProvinces[provinceId] = {
                            name: provinceId,
                            municipalities: [...new Set(uniqueMunicipalities)],
                            totalMunicipalities: [...new Set(totalMunicipalities)]
                        };
                    } else {
                        groupedProvinces[provinceId].municipalities.push(...uniqueMunicipalities);
                        groupedProvinces[provinceId].totalMunicipalities.push(...totalMunicipalities);
                    }
                });

                //Lurraldeak antoleu
                const sortedProvinces = Object.keys(groupedProvinces).sort((a, b) => {
                    console.log(groupedProvinces[a]);
                    const nameA = groupedProvinces[a].name.toLowerCase();
                    const nameB = groupedProvinces[b].name.toLowerCase();
                    return nameA.localeCompare(nameB);
                });

                let selectedGlobal = 0;
                let TotalGlobal = 0;

                //Lurraldeak eta udalerriak zerrendan ipiñi
                sortedProvinces.forEach(provinceId => {
                    const province = groupedProvinces[provinceId];
                    const percentage = ([... new Set(Object.values(groupedProvinces).find(item => item.name === provinceId)["municipalities"])].length / [... new Set(Object.values(groupedProvinces).find(item => item.name === provinceId)["totalMunicipalities"])].length) * 100;
                    selectedGlobal += [... new Set(Object.values(groupedProvinces).find(item => item.name === provinceId)["municipalities"])].length;
                    TotalGlobal += [... new Set(Object.values(groupedProvinces).find(item => item.name === provinceId)["totalMunicipalities"])].length;

                    //Lurraldeak    
                    const provinceDiv = document.createElement('div');
                    provinceDiv.className = 'province';
                    provinceDiv.innerHTML = `${province.name} (%${percentage.toFixed(2)})`;
                    province.municipalities = [...new Set(province.municipalities)];
                    const ul = document.createElement('ul');

                    //Udalerriak
                    province.municipalities.sort().forEach(id => {
                        const li = document.createElement('li');
                        li.className = 'municipality';

                        const span = document.createElement('span');
                        span.textContent = id;

                        //Info Wikipedia button
                        const infoImage = document.createElement('img');
                        infoImage.className = "infoImage";
                        infoImage.src = '../assets/images/info.png';
                        infoImage.alt = 'Informaziño gehiau';
                        infoImage.style.cursor = 'pointer';
                        infoImage.style.marginLeft = '10px';
                        const a = document.createElement('a');
                        a.href = `https://eu.wikipedia.org/wiki/${id}`;
                        a.target = '_blank';
                        a.appendChild(infoImage);

                        li.appendChild(span);
                        li.appendChild(a);

                        ul.appendChild(li);
                    });

                    provinceDiv.appendChild(ul);
                    provinceListElement.appendChild(provinceDiv);
                });

                //%
                const globalPercentage = (selectedGlobal / TotalGlobal) * 100;
                titleElement.textContent = `Egondako herrialdetan (%${globalPercentage.toFixed(2)})`;
                let percentageCounter = document.createElement("div");
                percentageCounter.id = "contador-porcentaje";
                document.getElementById("mapa-container").appendChild(percentageCounter);
                percentageCounter.innerText = `Euskal Herria: %${globalPercentage.toFixed(2)}`;
            }

            applySavedColors();
            updateList();

            //Button
            document.getElementById('search-btn').addEventListener('click', function () {
                const inputText = document.getElementById('search-input').value.trim();

                if (inputText === '') {
                    alert("Idatzi udalerriaren izena.");
                    return;
                }

                const normalizedName = normalizeText(inputText);
                const matchingMunicipalities = document.querySelectorAll(`path[id="${normalizedName}"]`);

                if (matchingMunicipalities.length > 0) {
                    let provinceColor = null;

                    // Obtener el grupo de la provincia del primer municipio
                    const provinceGroup = matchingMunicipalities[0].closest('g');
                    const provinceId = provinceGroup ? provinceGroup.id : null;

                    if (provinceId) {
                        // Obtener el color de la provincia asociada al grupo
                        provinceColor = provinceColors[provinceId];

                        // Comprobar si el municipio ya está coloreado
                        if (savedColors[normalizedName]) {
                            alert(`${normalizedName} jadanik margotute dau.`);
                            return;
                        }

                        // Colorear todos los paths con el mismo ID
                        matchingMunicipalities.forEach(municipality => {
                            municipality.style.fill = provinceColor;
                        });

                        // Guardar el color de todos los municipios con ese id
                        matchingMunicipalities.forEach(municipality => {
                            savedColors[municipality.id] = provinceColor;
                        });

                        // Guardar los colores y actualizar la lista
                        localStorage.setItem('coloresMunicipios', JSON.stringify(savedColors));
                        updateList();
                    }
                } else {
                    alert("Ez da aurkitu udalerri mapan.");
                }
            });

            //Suggestion
            const searchSuggestions = document.getElementById('search-suggestions');
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.trim();
                suggestMunicipalities(query, availableMunicipalities, searchSuggestions);
            });

            //Hide
            document.addEventListener('click', function (event) {
                if (!event.target.closest('#search-input') && !event.target.closest('#search-suggestions')) {
                    searchSuggestions.innerHTML = '';
                }
            });

            //{Enter} search
            searchInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    // Simular el clic en el botón de búsqueda
                    document.getElementById('search-btn').click();
                }
            });

            //Funcion
            svgElement.addEventListener('click', function (event) {
               handleMapClick(event, provinceColors, savedColors, normalizeText, updateList)
            });
        })
        .catch(error => console.error('Error al cargar el SVG:', error));
}