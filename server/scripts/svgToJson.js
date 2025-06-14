import fs from 'fs';
import { JSDOM } from 'jsdom';

const svgFile = '../mapa.svg';
const outputFile = '../data/municipalities.json';

fs.readFile(svgFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo SVG:', err);
    return;
  }

  const dom = new JSDOM(data);
  const document = dom.window.document;

  const municipiosSet = new Set();
  const municipios = [];

  const provincias = document.querySelectorAll('g[id]');

  provincias.forEach(provincia => {
    const provinceId = provincia.id;

    provincia.querySelectorAll('path[id]').forEach(path => {
      const name = path.id;

      if (!municipiosSet.has(name)) {
        municipiosSet.add(name);
        municipios.push({
          name,
          province: provinceId
        });
      }
    });
  });

  fs.writeFileSync(outputFile, JSON.stringify(municipios, null, 2));
  console.log(`✔️  Municipios únicos guardados en ${outputFile} (${municipios.length} municipios)`);
});
