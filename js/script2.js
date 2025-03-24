let menuBtn = document.createElement("button");
menuBtn.id = "menu-btn";
menuBtn.innerHTML = "☰";
document.body.appendChild(menuBtn);


menuBtn.addEventListener("click", function () {
    let menu = document.getElementById("municipios-list");
    menu.classList.toggle("active");
});

fetch('version.txt') // Un archivo con un número de versión
    .then(res => res.text())
    .then(version => {
        if (localStorage.getItem('version') !== version) {
            localStorage.setItem('version', version);
            location.reload();
        }
    });
const nuevaURL = window.location.pathname + "?v=" + new Date().getTime();
window.history.pushState({}, "", nuevaURL);

// Herrialdetako margoek
const coloresProvincias = {
    "Bizkaia": "#0f7e21 ", // Orlegie
    "Gipuzkoa": "#107bca ", // Oztiñe
    "Araba": "#dcdc0a ", // Bellegi
    "Nafarroa": "#f02727", // Gorrie
    "Lapurdi": "purple", // Fucsia
    "Zuberoa": "#0a5762 " // Cyan
};

// Cargar el archivo SVG y manejar los eventos
fetch(`mapa.svg?timestamp=${new Date().getTime()}`)
    .then(response => response.text())
    .then(svg => {
        document.getElementById('mapa-container').innerHTML = svg;

        const svgElement = document.querySelector('svg');
        const coloresGuardados = JSON.parse(localStorage.getItem('coloresMunicipios')) || {};

        // Función para aplicar colores guardados
        function aplicarColoresGuardados() {
            Object.keys(coloresGuardados).forEach(id => {
                const paths = document.querySelectorAll(`path[id="${id}"]`);
                paths.forEach(path => path.style.fill = coloresGuardados[id]);
            });
        }

        // Función para actualizar la lista de municipios
        function actualizarLista() {
            const provinciaListElement = document.getElementById('provincia-list');
            const tituloElement = document.getElementById('titulo');
            provinciaListElement.innerHTML = '';

            let totalMunicipiosGlobal = 0;
            let totalVisitadosGlobal = 0;

            // Obtener todas las provincias a partir de los grupos <g> del mapa
            const provinciasGrupos = document.querySelectorAll('g');

            provinciasGrupos.forEach(grupoProvincia => {
                const provinciaId = grupoProvincia.id;

                // Obtener todos los municipios de la provincia
                const municipiosEnProvincia = Array.from(grupoProvincia.querySelectorAll('path'))
                    .map(path => path.id); // Obtener los IDs de los municipios dentro de la provincia

                // Filtrar los municipios que están coloreados
                const selectedMunicipios = municipiosEnProvincia.filter(id => coloresGuardados[id] === coloresProvincias[provinciaId]);
                const totalMunicipios = municipiosEnProvincia.length;

                totalMunicipiosGlobal += totalMunicipios;
                totalVisitadosGlobal += selectedMunicipios.length;

                const porcentaje = totalMunicipios > 0 ? (selectedMunicipios.length / totalMunicipios) * 100 : 0;

                // Crear el contenedor para la provincia
                const provinciaDiv = document.createElement('div');
                provinciaDiv.className = 'provincia';
                provinciaDiv.innerHTML = `${provinciaId} (%${porcentaje.toFixed(2)})`;

                // Crear la lista de municipios para esa provincia
                const ul = document.createElement('ul');

                // Asegurarse de que los municipios estén ordenados alfabéticamente
                selectedMunicipios.sort().forEach(id => {
                    const li = document.createElement('li');
                    li.className = 'municipio';
                    li.textContent = id;
                    ul.appendChild(li);
                });

                provinciaDiv.appendChild(ul);
                provinciaListElement.appendChild(provinciaDiv);
            });

            // Calcular el porcentaje global de municipios visitados
            const porcentajeGlobal = totalMunicipiosGlobal > 0 ? (totalVisitadosGlobal / totalMunicipiosGlobal) * 100 : 0;

            // Actualizar el título con el porcentaje global
            tituloElement.textContent = `Egondako herrialdetan (%${porcentajeGlobal.toFixed(2)})`;

            // Mostrar el porcentaje global en la interfaz de usuario
            let contadorPorcentaje = document.createElement("div");
            contadorPorcentaje.id = "contador-porcentaje";
            document.getElementById("mapa-container").appendChild(contadorPorcentaje);

            // Mostrar el porcentaje global con solo dos decimales
            contadorPorcentaje.innerText = `Euskal Herria: %${porcentajeGlobal.toFixed(2)}`;
        }


        // Función para transformar texto
        function transformarTexto(texto) {
            const excepciones = ['de', 'la', 'el', 'en', 'y', 'a', 'del', 'al'];

            return texto
                .split(/(\s|-)/) // Divide pero conserva los separadores (espacios o guiones)
                .map((part, index, arr) => {
                    if (part === ' ' || part === '-') return part; // Mantener separadores sin cambios
                    const esPrimeraPalabra = (index === 0 || arr[index - 1] === ' ' || arr[index - 1] === '-');
                    const palabraEnMin = part.toLowerCase();

                    if (!esPrimeraPalabra && excepciones.includes(palabraEnMin)) {
                        return palabraEnMin; // Mantener en minúsculas si está en la lista y no es la primera palabra
                    }
                    return palabraEnMin.charAt(0).toUpperCase() + palabraEnMin.slice(1);
                })
                .join(''); // Une todo respetando los separadores
        }


        // Aplicar colores guardados inicialmente
        aplicarColoresGuardados();
        actualizarLista();

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
                            const municipioExiste = document.querySelector(`path[id="${nombreNormalizado}"]`);

                            if (municipioExiste) {
                                // Obtener el grupo de la provincia del municipio ingresado
                                const grupoProvincia = municipioExiste.closest('g');
                                const provinciaId = grupoProvincia ? grupoProvincia.id : null;

                                if (provinciaId) {
                                    provinciaColor = coloresProvincias[provinciaId];

                                    // Si el municipio ya está coloreado, mostrar una alerta
                                    if (coloresGuardados[nombreNormalizado]) {
                                        alert("Udalerri hau jadanik dau mapan");
                                    } else {
                                        // Colorear el municipio con el color de su provincia
                                        municipioExiste.style.fill = provinciaColor;
                                        coloresGuardados[nombreNormalizado] = provinciaColor;
                                    }
                                }
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
    .catch(error => console.error('Ezin izan da SVG-a kargeu:', error));
//localStorage.clear();
//console.dir(coloresProvincias);