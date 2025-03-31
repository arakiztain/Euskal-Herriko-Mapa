import { buscarEnWikipedia } from "./wiki.js";

fetch(`mapa.svg?timestamp=${new Date().getTime()}`)
    .then(response => response.text())
    .then(svg => {
        document.getElementById('mapa-container').innerHTML = svg;

        const svgElement = document.querySelector('svg');
        const coloresGuardados = JSON.parse(localStorage.getItem('coloresMunicipios')) || {};
        const municipiosDisponibles = new Set();

        //Tooltip (Udalerri, Lurralde)
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

                //path multiples
                let relatedPaths = [];
                
                //mouseover event
                path.addEventListener('mouseover', function(event) {
                    const municipioId = event.target.id;
                    const provinciaId = event.target.parentElement.id
                    tooltip.innerHTML = `<pre> Udalerria: ${municipioId} \n Probintzia: ${provinciaId}<pre/>`;
                    tooltip.style.display = 'block';

                    //X,Y
                    const pathRect = event.target.getBoundingClientRect();
                    tooltip.style.left = `${pathRect.left + window.scrollX + pathRect.width / 2 - tooltip.offsetWidth / 2}px`;
                    tooltip.style.top = `${pathRect.top + window.scrollY - tooltip.offsetHeight - 5}px`;

                    //path bat baño gehiau badauz, bategaz egonda danak margozten diez
                    relatedPaths = document.querySelectorAll(`path[id*="${municipioId.split('_')[0]}"]`);

                    relatedPaths.forEach((realeatedPath) => {
                        realeatedPath.style.fill = "white";
                        realeatedPath.style.transition = 'all 0.5s ease';
                    });
                });

                //Kentzeko
                path.addEventListener('mouseout', function() {
                    tooltip.style.display = 'none';
                    
                    relatedPaths.forEach((realeatedPath) => {
                        realeatedPath.style.fill = '#ffeabf';
                    });
                    
                });
            }
        });

        //Bilatu button
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
                                buscarEnWikipedia(municipiosConMismoId);
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
