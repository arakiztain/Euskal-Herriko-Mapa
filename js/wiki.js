import { normalizeText } from "./utils.js";

let municipioColoreado = null;

export function buscarEnWikipedia(query) {
    const url = `https://eu.wikipedia.org/w/api.php?`;
    query = normalizeText(query);
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

            if (pages[pageId] && pages[pageId].extract) {
                
                const extracto = pages[pageId].extract;
                const resultadoDiv = document.getElementById('results');
                resultadoDiv.innerHTML = '';

                //Image?
                const thumbnail = pages[pageId].thumbnail ? pages[pageId].thumbnail.source : null;

                //Info
                const div = document.createElement('div');
                div.classList.add('resultado');
                div.innerHTML = `
                <h3>${pages[pageId].title}</h3>
                <p>${extracto}</p>
                ${thumbnail ? `<img src="${thumbnail}" alt="Imagen de ${pages[pageId].title}" style="max-width: 300px; margin-top: 10px;" />` : ''}
                <a href="https://eu.wikipedia.org/wiki/${encodeURIComponent(pages[pageId].title)}" target="_blank">Gehiau irakurri</a>`;
                resultadoDiv.appendChild(div);

                if (municipioColoreado) {
                    const pathAnterior = document.querySelector(`path[id="${municipioColoreado}"]`);
                    if (pathAnterior) {
                        pathAnterior.style.fill = '#ffeabf'; 
                    }
                }

            } else {
                const resultadoDiv = document.getElementById('results');
                resultadoDiv.innerHTML = '<p>Ez da udalerria aurkitu. Beste bategaz saiatu.</p>';
            }
        })
        .catch(error => console.error('Error al consultar la API de Wikipedia:', error));
}


document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});
