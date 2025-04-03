export const coloresProvincias = {
    "Bizkaia": "#0f7e21", // Orlegie
    "Gipuzkoa": "#107bca", // Oztiñe
    "Araba": "#dcdc0a", // Bellegi
    "Nafarroa": "#f02727", // Gorrie
    "Lapurdi": "purple", // Fucsia
    "Zuberoa": "#0a5762" // Cyan
};

export function checkVersion() {
    fetch('version.txt')
        .then(res => res.text())
        .then(version => {
            if (localStorage.getItem('version') !== version) {
                localStorage.setItem('version', version);
                location.reload();
            }
        });
}

export function transformarTexto(texto) {
    const excepciones = ['de', 'la', 'el', 'en', 'y', 'a', 'del', 'al'];

    return texto
        .split(/(\s|-)/)
        .map((part, index, arr) => {
            if (part === ' ' || part === '-') return part;
            const esPrimeraPalabra = (index === 0 || arr[index - 1] === ' ' || arr[index - 1] === '-');
            const palabraEnMin = part.toLowerCase();

            if (!esPrimeraPalabra && excepciones.includes(palabraEnMin)) {
                return palabraEnMin;
            }
            return palabraEnMin.charAt(0).toUpperCase() + palabraEnMin.slice(1);
        })
        .join('');
}

export function sugerirMunicipios(query, municipiosDisponibles, searchSuggestions) {
    searchSuggestions.innerHTML = '';

    if (query === '') return;

    const sugerencias = Array.from(municipiosDisponibles).filter(municipioId =>
        municipioId.toLowerCase().startsWith(query.toLowerCase()) 
    );

    sugerencias.forEach(municipio => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = municipio;

        suggestionItem.addEventListener('click', function () {
            searchInput.value = municipio;
            searchSuggestions.innerHTML = ''; 

            const path = document.querySelector(`path[id="${municipio}"]`);
            if (path) {
                path.click(); 
            }
        });

        searchSuggestions.appendChild(suggestionItem);
    });
}

const searchSuggestions = document.getElementById('search-suggestions');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim(); 
    sugerirMunicipios(query, municipiosDisponibles, searchSuggestions);  
});

