import React, { useEffect, useState } from 'react';
import { getUserMunicipalities } from '../utils/fetchServer';
import { provinceColors } from '../utils/provinceColors';

export function Map() {
  const [svgContent, setSvgContent] = useState('');
  const [userMunicipalities, setUserMunicipalities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const municipalities = await getUserMunicipalities();
        setUserMunicipalities(municipalities);

        const svgRes = await fetch(`/mapa.svg?timestamp=${new Date().getTime()}`);
        if (svgRes.ok) {
          const svgText = await svgRes.text();
          setSvgContent(svgText);
        }
      } catch (error) {
        console.error('❗ Error cargando datos:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!svgContent || userMunicipalities.length === 0) return;

    const container = document.getElementById('mapa-container');
    container.innerHTML = svgContent;

    // Pintar municipios visitados según la provincia
    userMunicipalities.forEach(({ municipality }) => {
      if (!municipality) return;
      const { id, province } = municipality;
      const color = provinceColors[province] || '#CCC'; // color por defecto

      const paths = container.querySelectorAll(`path[id="${id}"]`);
      paths.forEach(path => (path.style.fill = color));
    });

  }, [svgContent, userMunicipalities]);

  return <div id="mapa-container"></div>;
}
