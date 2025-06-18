import { useEffect, useState } from 'react';
import { useMunicipalities } from '../context/MunicipalityContext';
import { provinceColors } from '../utils/provinceColors';
import { addUserMunicipality } from '../utils/fetchServer';

export function SVG() {
  const { municipalities, fetchMunicipalities } = useMunicipalities();
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const fetchSVG = async () => {
      const res = await fetch(`/mapa.svg?timestamp=${Date.now()}`);
      if (res.ok) {
        const svgText = await res.text();
        setSvgContent(svgText);
      }
    };
    fetchSVG();
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const container = document.getElementById('mapa-container');
    container.innerHTML = svgContent;

    // Añadir evento de click a cada path (municipio)
    const paths = container.querySelectorAll('path');
    paths.forEach(path => {
      path.style.cursor = 'pointer';
      path.addEventListener('click', () => {
        const name = path.getAttribute('id');

        const confirmAdd = prompt(`¿Quieres añadir "${name}"?`);
        if (confirmAdd) {
          handleAddMunicipality(name);
        }
      });
    });

    //Margoztu
    municipalities.forEach(({ name, province }) => {
      if (!name || !province) return;
      const color = provinceColors[province] || '#CCC';

      const pathsToColor = container.querySelectorAll(`path[id="${name}"]`);
      pathsToColor.forEach(path => (path.style.fill = color));
    });
  }, [svgContent, municipalities]);

  const handleAddMunicipality = async (municipalityName) => {
    try {
      console.log('municipalityName', municipalityName);
      await addUserMunicipality(municipalityName);
      await fetchMunicipalities();
    } catch (error) {
      console.error('Error añadiendo municipio:', error);
    }
  };

  return <div id="mapa-container" />;
}
