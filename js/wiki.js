export  function buscarEnWikipedia(query) {
    const url = `https://eu.wikipedia.org/w/api.php?`;

    const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exintro: true,
        exchars: 500, 
        titles: query,
        origin: '*', 
    });

//GET API Wikipedia
fetch(url + params.toString())
    .then(response => response.json())
    .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        console.log(pages);
        if (pages[pageId] && pages[pageId].extract) {
            const extracto = pages[pageId].extract;
            const resultadoDiv = document.getElementById('resultados');
            resultadoDiv.innerHTML = ''; 

            //Image
             const thumbnail = pages[pageId].thumbnail ? pages[pageId].thumbnail.source : null;
             console.log('Thumbnail:', thumbnail); // Verifica si existe la URL de la imagen

            //Info
            const div = document.createElement('div');
            div.classList.add('resultado');
            div.innerHTML = `
                <h3>${pages[pageId].title}</h3>
                <p>${extracto}</p>
                ${thumbnail ? `<img src="${thumbnail}" alt="Imagen de ${pages[pageId].title}" style="max-width: 300px; margin-top: 10px;" />` : ''}
                <a href="https://eu.wikipedia.org/wiki/${encodeURIComponent(pages[pageId].title)}" target="_blank">Gehiau irakurri</a>`;
            resultadoDiv.appendChild(div);
        } else {
            const resultadoDiv = document.getElementById('resultados');
            resultadoDiv.innerHTML = '<p>Ez da udalerria aurkitu. Beste bategaz saiatu.</p>';
        }
    })
    .catch(error => console.error('Error al consultar la API de Wikipedia:', error));

}

// Configurar el botón de búsqueda
document.getElementById('search-btn').addEventListener('click', function () {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        buscarEnWikipedia(query);
    } else {
        alert('Por favor, ingrese un municipio para buscar.');
    }
});

// Opción para buscar cuando se presiona Enter
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});