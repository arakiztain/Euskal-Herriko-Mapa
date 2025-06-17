import { buscarEnWikipedia } from "./wiki.js";
import { normalizeText, provinceColors, suggestMunicipalities } from "./utils.js";

fetch(`mapa.svg?timestamp=${new Date().getTime()}`)
    .then(response => response.text())
    .then(svg => {
        document.getElementById('mapa-container').innerHTML = svg;

        let previousHighlightedPaths = [];
        let provinciaList = new Set();
        const municipiosDisponibles = new Set();
        const provincias = new Set();
        const provinciaColoreada = new Set();

        // Tooltip (Udalerria, Lurralde)
        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '3px';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);

        // Obtener todos los municipios del mapa (elementos path), excluyendo los que tienen "path" en su id
        document.querySelectorAll('path').forEach(path => {
            if (path.id && !path.id.includes('path')) {
                municipiosDisponibles.add(path.id);

                // Obtener la provincia (grupo 'g') a la que pertenece el municipio
                const provinciaId = path.closest('g') ? path.closest('g').id : null;
                if (provinciaId) {
                    provincias.add(provinciaId);
                }

                // Evento mouseover
                path.addEventListener('mouseover', function (event) {
                    const municipioId = event.target.id;
                    const provinciaId = event.target.closest('g') ? event.target.closest('g').id : null;
                    tooltip.innerHTML = `<pre> Udalerria: ${municipioId} \n Probintzia: ${provinciaId}<pre/>`;
                    tooltip.style.display = 'block';

                    // Posicionar el tooltip
                    const pathRect = event.target.getBoundingClientRect();
                    tooltip.style.left = `${pathRect.left + window.scrollX + pathRect.width / 2 - tooltip.offsetWidth / 2}px`;
                    tooltip.style.top = `${pathRect.top + window.scrollY - tooltip.offsetHeight - 5}px`;

                    const relatedPaths = document.querySelectorAll(`path[id="${municipioId.split('_')[0]}"]`);

                    relatedPaths.forEach((relatedPath) => {
                        const group = relatedPath.closest('g');
                        if (previousHighlightedPaths.length > 0) {
                            document.querySelectorAll(`path[id^="${previousHighlightedPaths[0].id.split('_')[0]}"]`).forEach((path) => {
                                path.style.fill = '#ffeabf';
                                previousHighlightedPaths.pop(path);

                            })
                        }
                        if (group && !provinciaList.has(group.id)) {
                            buscarEnWikipedia(municipioId);
                            relatedPath.style.fill = 'white';
                            relatedPath.style.transition = 'all 0.5s ease';
                        }

                    });
                });

                // Evento mouseout
                path.addEventListener('mouseout', function (event) {
                    tooltip.style.display = 'none';

                    if (!provinciaColoreada.has(path.closest('g').id)) {
                        const relatedPaths = document.querySelectorAll(`path[id^="${path.id.split('_')[0]}"]`);
                        relatedPaths.forEach((relatedPath) => {
                            if (provinciaList.size > 0) {
                                buscarEnWikipedia([...provinciaList][provinciaList.size - 1]);
                            }
                            document.getElementById('results').innerHTML = "";
                            relatedPath.style.fill = '#ffeabf';
                            previousHighlightedPaths.pop(relatedPath);
                        });
                    }
                });
            }
        });

        //Checkbox
        const Resultcheckbox = document.getElementById('checkbox');
        provincias.forEach(provincia => {
            const provinciaDiv = document.createElement('div');
            provinciaDiv.className = 'provincia-card';

            provinciaDiv.innerHTML = `
        <div class="card-header">${provincia}</div>
        <div class="card-image-container">
            <input type="checkbox" id="provincia-${provincia}" class="provincia-checkbox" />
            <label for="provincia-${provincia}" class="card-label">
                <img src='../assets/images/checkbox/${provincia}.png' alt="${provincia}">
            </label>
        </div>
    `;

            const checkbox = provinciaDiv.querySelector('.provincia-checkbox');
            const label = provinciaDiv.querySelector('.card-label');

            //Change
            checkbox.addEventListener('change', function () {
                const checkboxId = this.id.replace('provincia-', '');
                const grupoProvincia = document.querySelectorAll(`g[id="${checkboxId}"]`);

                if (this.checked) {
                    buscarEnWikipedia(checkboxId);
                    provinciaList.add(checkboxId);

                    grupoProvincia.forEach(grupo => {
                        const paths = grupo.querySelectorAll('path');
                        const color = provinceColors[checkboxId];
                        paths.forEach(path => {
                            if (!path.id.includes('path')) {
                                path.style.fill = color;
                            }
                        });
                    });
                    provinciaColoreada.add(checkboxId);
                    provinciaDiv.classList.add('selected');
                } else {
                    //Quit
                    grupoProvincia.forEach(grupo => {
                        grupo.querySelectorAll('path').forEach(path => {
                            if (!path.id.includes('path')) {
                                path.style.fill = '#ffeabf';
                            }
                        });
                    });

                    provinciaList.delete(checkboxId);
                    provinciaColoreada.delete(checkboxId);
                    provinciaDiv.classList.remove('selected');

                    if (provinciaList.size > 0) {
                        buscarEnWikipedia([...provinciaList].pop());
                    } else {
                        document.getElementById('results').innerHTML = "";
                        buscarEnWikipedia("Not");
                    }
                }
            });

            
            provinciaDiv.addEventListener('click', function (event) {
                if (event.target !== checkbox && event.target !== label && !label.contains(event.target)) {
                    checkbox.checked = !checkbox.checked;
                    const changeEvent = new Event('change');
                    checkbox.dispatchEvent(changeEvent);
                }
            });

            Resultcheckbox.appendChild(provinciaDiv);
        });

        //Search button
        document.getElementById('search-btn').addEventListener('click', function () {
            const query = normalizeText(document.getElementById('search-input').value.trim());

            if (query) {
                //Clean
                document.getElementById('results').innerHTML = "";

                //delete 
                previousHighlightedPaths.forEach(path => {
                    path.style.fill = '#ffeabf';
                });

                //Clean
                previousHighlightedPaths = [];

               
                const newPaths = document.querySelectorAll(`path[id="${query.split('_')[0]}"]`);


                //Paint
                newPaths.forEach((relatedPath) => {
                    relatedPath.style.fill = 'white';
                    relatedPath.style.transition = 'all 0.5s ease';
                    previousHighlightedPaths.push(relatedPath);
                });

                buscarEnWikipedia(query);
            } else {
                alert('Por favor, ingrese un municipio para buscar.');
            }
        });


        // Llamada a la función dentro del evento de input
        const searchSuggestions = document.getElementById('search-suggestions');
        const searchInput = document.getElementById('search-input');

        // Función de autocompletado
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.trim();  // Capturamos la entrada del usuario
            suggestMunicipalities(query, municipiosDisponibles, searchSuggestions);  // Llamamos a la función para mostrar las sugerencias
        });


        // Click fuera
        document.addEventListener('click', function (event) {
            if (!event.target.closest('#search-input') && !event.target.closest('#search-suggestions')) {
                searchSuggestions.innerHTML = '';
            }
        });

        // Enter input
        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                document.getElementById('search-btn').click();
            }
        });

    })
    .catch(error => console.error('Error al cargar el SVG:', error));
