import { transformarTexto, coloresProvincias } from './utils.js';
import { buscarEnWikipedia } from './wiki.js';

export function loadMap() {
    fetch(`mapa.svg?timestamp=${new Date().getTime()}`)
        .then(response => response.text())
        .then(svg => {
            document.getElementById('mapa-container').innerHTML = svg;

            const svgElement = document.querySelector('svg');
            const coloresGuardados = JSON.parse(localStorage.getItem('coloresMunicipios')) || {};
            const municipiosDisponibles = new Set();

            // Obtener todos los municipios del mapa (elementos path), excluyendo los que tienen "path" en su id
            document.querySelectorAll('path').forEach(path => {
                if (path.id && !path.id.includes('path')) {
                    municipiosDisponibles.add(path.id);
                }
            });

            // Función para aplicar colores guardados
            function aplicarColoresGuardados() {
                Object.keys(coloresGuardados).forEach(id => {
                    const paths = document.querySelectorAll(`path[id="${id}"]`);
                    paths.forEach(path => path.style.fill = coloresGuardados[id]);
                });
            }

            // Función para actualizar la lista de provincias y municipios
            function actualizarLista() {
                const provinciaListElement = document.getElementById('provincia-list');
                const tituloElement = document.getElementById('titulo');
                provinciaListElement.innerHTML = '';

                let totalMunicipiosGlobal = 0;
                let totalVisitadosGlobal = 0;

                // Crear un objeto para almacenar provincias y sus municipios
                const provinciasAgrupadas = {};
                const provinciasAgrupadasTotal = {};

                // Obtener todas las provincias a partir de los grupos <g> del mapa
                const provinciasGrupos = document.querySelectorAll('g');

                provinciasGrupos.forEach(grupoProvincia => {
                    const provinciaId = grupoProvincia.id;

                    // Obtener todos los municipios de la provincia
                    const municipiosEnProvincia = Array.from(grupoProvincia.querySelectorAll('path'))
                        .map(path => path.id);

                    // Filtrar los municipios que están coloreados
                    const selectedMunicipios = municipiosEnProvincia.filter(id => coloresGuardados[id] === coloresProvincias[provinciaId]);

                    // Eliminar duplicados: un municipio solo cuenta una vez | Bakarrik kentze ari dauz zerrendetako bikoitzak, beste baten badau ez
                    const municipiosUnicos = [...new Set(selectedMunicipios)];

                    //const totalMunicipios = [...new Set(municipiosEnProvincia.filter(municipio => !municipio.includes("path")))].length;
                    const totalMunicipios = [...new Set(municipiosEnProvincia.filter(municipio => !municipio.includes("path")))];

                    const selectedMunicipiosUnicos = municipiosUnicos.length;

                    if (!provinciasAgrupadas[provinciaId]) {
                        provinciasAgrupadas[provinciaId] = {
                            nombre: provinciaId,
                            municipios: [...new Set(municipiosUnicos)],
                            municipiosTotal: [...new Set(totalMunicipios)]
                        };
                    } else {
                        provinciasAgrupadas[provinciaId].municipios.push(...municipiosUnicos);
                        provinciasAgrupadas[provinciaId].municipiosTotal.push(...totalMunicipios);
                    }
                });

                // Ordenar las provincias por nombre alfabéticamente
                const provinciasOrdenadas = Object.keys(provinciasAgrupadas).sort((a, b) => {
                    const nombreA = provinciasAgrupadas[a].nombre.toLowerCase();
                    const nombreB = provinciasAgrupadas[b].nombre.toLowerCase();
                    return nombreA.localeCompare(nombreB);
                });

                let selectedGlobal = 0;
                let TotalGlobal = 0;

                // Crear los elementos de provincia basados en el objeto agrupado
                provinciasOrdenadas.forEach(provinciaId => {
                    const provincia = provinciasAgrupadas[provinciaId];
                    const por = ([... new Set(Object.values(provinciasAgrupadas).find(objeto => objeto.nombre === provinciaId)["municipios"])].length / [... new Set(Object.values(provinciasAgrupadas).find(objeto => objeto.nombre === provinciaId)["municipiosTotal"])].length) * 100;
                    selectedGlobal += [... new Set(Object.values(provinciasAgrupadas).find(objeto => objeto.nombre === provinciaId)["municipios"])].length;
                    TotalGlobal += [... new Set(Object.values(provinciasAgrupadas).find(objeto => objeto.nombre === provinciaId)["municipiosTotal"])].length;

                    //Provincias    
                    const provinciaDiv = document.createElement('div');
                    provinciaDiv.className = 'provincia';
                    provinciaDiv.innerHTML = `${provincia.nombre} (%${por.toFixed(2)})`;
                    provincia.municipios = [...new Set(provincia.municipios)];
                    const ul = document.createElement('ul');

                    //Udalerriak
                    provincia.municipios.sort().forEach(id => {
                        const li = document.createElement('li');
                        li.className = 'municipio';

                        const span = document.createElement('span');
                        span.textContent = id;

                        const infoImage = document.createElement('img');
                        infoImage.className = "infoImage";
                        infoImage.src = 'info.png'; 
                        infoImage.alt = 'Más información';
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


                    provinciaDiv.appendChild(ul);
                    provinciaListElement.appendChild(provinciaDiv);
                });

                // Calcular el porcentaje global de municipios visitados
                const TotalGlobalbal = (selectedGlobal / TotalGlobal) * 100;


                // Actualizar el título con el porcentaje global
                tituloElement.textContent = `Egondako herrialdetan (%${TotalGlobalbal.toFixed(2)})`;

                // Mostrar el porcentaje global en la interfaz de usuario
                let contadorPorcentaje = document.createElement("div");
                contadorPorcentaje.id = "contador-porcentaje";
                document.getElementById("mapa-container").appendChild(contadorPorcentaje);

                // Mostrar el porcentaje global con solo dos decimales
                contadorPorcentaje.innerText = `Euskal Herria: %${TotalGlobalbal.toFixed(2)}`;
            }

            // Aplicar colores guardados inicialmente
            aplicarColoresGuardados();
            actualizarLista();

            // Event listener para el botón "Bilatu"
            document.getElementById('search-btn').addEventListener('click', function () {
                const inputNombre = document.getElementById('search-input').value.trim();

                if (inputNombre === '') {
                    alert("Idatzi udalerriaren izena.");
                    return;
                }

                const nombreNormalizado = transformarTexto(inputNombre);
                const municipiosConMismoId = document.querySelectorAll(`path[id="${nombreNormalizado}"]`);

                if (municipiosConMismoId.length > 0) {
                    let provinciaColor = null;

                    // Obtener el grupo de la provincia del primer municipio
                    const grupoProvincia = municipiosConMismoId[0].closest('g');
                    const provinciaId = grupoProvincia ? grupoProvincia.id : null;

                    if (provinciaId) {
                        // Obtener el color de la provincia asociada al grupo
                        provinciaColor = coloresProvincias[provinciaId];

                        // Comprobar si el municipio ya está coloreado
                        if (coloresGuardados[nombreNormalizado]) {
                            alert(`${nombreNormalizado} jadanik margotute dau.`);
                            return;
                        }

                        // Colorear todos los paths con el mismo ID
                        municipiosConMismoId.forEach(municipio => {
                            municipio.style.fill = provinciaColor;
                        });

                        // Guardar el color de todos los municipios con ese id
                        municipiosConMismoId.forEach(municipio => {
                            coloresGuardados[municipio.id] = provinciaColor;
                        });

                        // Guardar los colores y actualizar la lista
                        localStorage.setItem('coloresMunicipios', JSON.stringify(coloresGuardados));
                        actualizarLista();
                    }
                } else {
                    alert("Ez da aurkitu udalerri mapan.");
                }
            });

            // Función de autocompletado
            const searchSuggestions = document.getElementById('search-suggestions');
            const searchInput = document.getElementById('search-input');

            searchInput.addEventListener('input', function () {
                const query = searchInput.value.trim().toLowerCase();

                // Limpiar las sugerencias anteriores
                searchSuggestions.innerHTML = '';

                if (query === '') return;

                // Filtrar municipios que coincidan con la búsqueda
                const sugerencias = Array.from(municipiosDisponibles).filter(municipioId =>
                    municipioId.toLowerCase().includes(query)
                );

                // Mostrar las sugerencias
                sugerencias.forEach(municipio => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = municipio;
                    suggestionItem.addEventListener('click', function () {
                        // Cuando se hace clic en una sugerencia, se selecciona y colorea
                        searchInput.value = municipio;
                        searchSuggestions.innerHTML = ''; // Limpiar sugerencias

                        const path = document.querySelector(`path[id="${municipio}"]`);
                        if (path) {
                            path.click(); // Simular un clic en el municipio
                        }
                    });
                    searchSuggestions.appendChild(suggestionItem);
                });
            });

            // Ocultar sugerencias si se hace clic fuera
            document.addEventListener('click', function (event) {
                if (!event.target.closest('#search-input') && !event.target.closest('#search-suggestions')) {
                    searchSuggestions.innerHTML = '';
                }
            });

            // Manejo del evento Enter en el campo de búsqueda (input)
            searchInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    // Simular el clic en el botón de búsqueda
                    document.getElementById('search-btn').click();
                }
            });

            // Manejo del clic en el mapa
            svgElement.addEventListener('click', function (event) {
                if (event.target.tagName === 'path') {
                    const municipioId = event.target.id;
                    let provinciaColor = null;

                    // Buscar el grupo <g> más cercano al <path> clicado
                    const grupoProvincia = event.target.closest('g');
                    const provinciaId = grupoProvincia ? grupoProvincia.id : null;

                    if (provinciaId) {
                        // Obtener el color de la provincia asociada al grupo
                        provinciaColor = coloresProvincias[provinciaId];

                        // Si el municipio ya tiene un color asignado, lo eliminamos
                        if (coloresGuardados[municipioId]) {
                            const paths = document.querySelectorAll(`path[id="${municipioId}"]`);
                            paths.forEach(path => path.style.fill = '#ffeabf'); // Color por defecto
                            delete coloresGuardados[municipioId];
                        } else {
                            // Solicitar el nombre del municipio mediante un prompt
                            const inputNombre = prompt('Sartu ezazu udalerriaren izena:', municipioId);
                            if (inputNombre) {
                                const nombreNormalizado = transformarTexto(inputNombre);
                                const municipiosConMismoId = document.querySelectorAll(`path[id="${nombreNormalizado}"]`);

                                if (municipiosConMismoId.length > 0) {
                                    // Comprobar si el municipio ya está coloreado
                                    if (coloresGuardados[nombreNormalizado]) {
                                        alert(`El municipio ${nombreNormalizado} ya está seleccionado.`);
                                        return;
                                    }

                                    // Aplicar el color de la provincia a todos los paths con el mismo ID
                                    municipiosConMismoId.forEach(municipio => {
                                        municipio.style.fill = provinciaColor;
                                    });

                                    // Guardar el color de todos los municipios con ese id
                                    municipiosConMismoId.forEach(municipio => {
                                        coloresGuardados[municipio.id] = provinciaColor;
                                    });
                                } else {
                                    alert("Ez da aurkitu udalerria mapan.");
                                }
                            }
                        }

                        // Guardar los colores y actualizar la lista
                        localStorage.setItem('coloresMunicipios', JSON.stringify(coloresGuardados));
                        actualizarLista();
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar el SVG:', error));
}
