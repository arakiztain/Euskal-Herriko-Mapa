import { useEffect, useState } from 'react';
import { useMunicipalities } from '../context/MunicipalityContext';
import { provinceColors } from '../utils/provinceColors';
import { addUserMunicipality } from '../utils/fetchServer';
import { removeUserMunicipality } from '../utils/fetchServer';

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

    //Click event
    const paths = container.querySelectorAll('path');

    paths.forEach(path => {
      const name = path.getAttribute('id');
      if (name.includes('path')) return;

      path.style.cursor = 'pointer';
      path.addEventListener('click', async() => {

      const currentFill = path.style.fill;
      const isSelected = currentFill !== 'rgb(255, 234, 191)';

      if (isSelected) {
        const confirmRemove = confirm(`"${name}" kendu gure dozu?`);
        if (confirmRemove) {
          await handleRemoveMunicipality(name);
          await fetchMunicipalities();
        }
      } else {
        const confirmAdd = prompt(`"${name}" gehitu gure dozu?`);
        if (confirmAdd) {
          await handleAddMunicipality(name);
          await fetchMunicipalities();
        }
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
      await addUserMunicipality(municipalityName);
      await fetchMunicipalities();
    } catch (error) {
      console.error('Error añadiendo municipio:', error);
    }
  };

  const handleRemoveMunicipality = async (municipalityName) => {
  try {
    await removeUserMunicipality(municipalityName);
    await fetchMunicipalities();
  } catch (error) {
    console.error('Error quitando municipio:', error);
  }
};

  return <div id="mapa-container" />;
}
