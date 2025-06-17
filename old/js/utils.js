export const provinceColors = {
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

export function normalizeText(text) {
    const exceptions = ['de', 'la', 'el', 'en', 'y', 'a', 'del', 'al'];

    return text
        .split(/(\s|-)/)
        .map((part, index, arr) => {
            if (part === ' ' || part === '-') return part;
            const isFirstWord = (index === 0 || arr[index - 1] === ' ' || arr[index - 1] === '-');
            const lowerCaseWord = part.toLowerCase();

            if (!isFirstWord && exceptions.includes(lowerCaseWord)) {
                return lowerCaseWord;
            }
            return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
        })
        .join('');
}


export function suggestMunicipalities(query, availableMunicipalities, searchSuggestions) {
    searchSuggestions.innerHTML = '';

    if (query === '') return;

    const suggestions = Array.from(availableMunicipalities).filter(municipalityId =>
        municipalityId.toLowerCase().startsWith(query.toLowerCase()) 
    );

    suggestions.forEach(municipality => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = municipality;

        suggestionItem.addEventListener('click', function () {
            const searchInput = document.getElementById('search-input');
            searchInput.value = municipality;
            searchSuggestions.innerHTML = ''; 

            const path = document.querySelector(`path[id="${municipality}"]`);
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

