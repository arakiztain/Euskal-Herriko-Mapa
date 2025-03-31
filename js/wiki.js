 // Función para realizar la búsqueda y obtener el extracto del artículo del municipio
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

    // Hacemos la solicitud GET a la API de Wikipedia
    fetch(url + params.toString())
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];

            if (pages[pageId] && pages[pageId].extract) {
                const extracto = pages[pageId].extract; 
                const resultadoDiv = document.getElementById('resultados');
                resultadoDiv.innerHTML = ''; 

                // Mostrar el artículo en la interfaz
                const div = document.createElement('div');
                div.classList.add('resultado');
                div.innerHTML = `
                    <h3>${pages[pageId].title}</h3>
                    <p>${extracto}</p>
                    <a href="https://eu.wikipedia.org/wiki/${encodeURIComponent(pages[pageId].title)}" target="_blank">Leer más</a>
                `;
                resultadoDiv.appendChild(div);
            } else {
                const resultadoDiv = document.getElementById('resultados');
                resultadoDiv.innerHTML = '<p>No se encontró el artículo del municipio. Intenta con otro nombre.</p>';
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