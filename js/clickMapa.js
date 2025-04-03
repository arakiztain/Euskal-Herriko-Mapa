export function handleMapClick(event, provinceColors, savedColors, normalizeText, updateList) {
    if (event.target.tagName !== 'path') return;

    const municipalityId = event.target.id;
    const provinceGroup = event.target.closest('g');
    const provinceId = provinceGroup ? provinceGroup.id : null;

    if (!provinceId) return;

    const provinceColor = provinceColors[provinceId];
    
    if (savedColors[municipalityId]) {
        resetMunicipalityColor(municipalityId);
        delete savedColors[municipalityId];
    } else {
        selectMunicipality(municipalityId, provinceColor, savedColors, normalizeText);
    }

    saveColors(savedColors);
    updateList();
}

function resetMunicipalityColor(municipalityId) {
    document.querySelectorAll(`path[id="${municipalityId}"]`)
        .forEach(path => path.style.fill = '#ffeabf');
}

function selectMunicipality(municipalityId, provinceColor, savedColors, normalizeText) {
    const inputName = prompt('Udalerriaren izena sar dezazu:', municipalityId);
    if (!inputName) return;

    const normalizedName = normalizeText(inputName);
    const municipalities = document.querySelectorAll(`path[id="${normalizedName}"]`);

    if (municipalities.length === 0) {
        alert("Udalerria ez da mapan aurkitu.");
        return;
    }

    if (savedColors[normalizedName]) {
        alert(`${normalizedName} jadanik margotute.`);
        return;
    }

    municipalities.forEach(municipality => {
        municipality.style.fill = provinceColor;
        savedColors[municipality.id] = provinceColor;
    });
}

function saveColors(savedColors) {
    localStorage.setItem('municipalityColors', JSON.stringify(savedColors));
}