// src/pages/ArgibideaPage.jsx
import { useEffect, useState, useRef } from "react";
// import { buscarEnWikipedia } from "../utils/wiki.js";
// import { normalizeText, provinceColors, suggestMunicipalities } from "../utils/utils.js";
import styles from "./Argibidea.module.css";

export default function ArgibideaPage() {
  const [svgContent, setSvgContent] = useState("");
  const [municipiosDisponibles, setMunicipiosDisponibles] = useState(new Set());
  const [provinciaList, setProvinciaList] = useState(new Set());
  const [provinciaColoreada, setProvinciaColoreada] = useState(new Set());
  const [previousHighlightedPaths, setPreviousHighlightedPaths] = useState([]);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // Crear tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    tooltipRef.current = tooltip;

    // Cargar SVG
    fetch(`mapa.svg?timestamp=${new Date().getTime()}`)
      .then(res => res.text())
      .then(svg => setSvgContent(svg))
      .catch(err => console.error('Error al cargar el SVG:', err));

    return () => {
      if (tooltipRef.current) document.body.removeChild(tooltipRef.current);
    };
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const container = document.getElementById('mapa-container');
    container.innerHTML = svgContent;

    const municipios = new Set();
    const provincias = new Set();
    const prevPaths = [];

    document.querySelectorAll('path').forEach(path => {
      if (!path.id || path.id.includes('path')) return;

      municipios.add(path.id);
      const provinciaId = path.closest('g')?.id;
      if (provinciaId) provincias.add(provinciaId);

      path.addEventListener('mouseover', (event) => {
        const municipioId = event.target.id;
        const provinciaId = event.target.closest('g')?.id;
        tooltipRef.current.innerHTML = `<pre>Udalerria: ${municipioId}\nProbintzia: ${provinciaId}</pre>`;
        tooltipRef.current.style.display = 'block';

        const rect = event.target.getBoundingClientRect();
        tooltipRef.current.style.left = `${rect.left + window.scrollX + rect.width/2 - tooltipRef.current.offsetWidth/2}px`;
        tooltipRef.current.style.top = `${rect.top + window.scrollY - tooltipRef.current.offsetHeight - 5}px`;

        // Pintar paths relacionados
        const relatedPaths = document.querySelectorAll(`path[id="${municipioId.split('_')[0]}"]`);
        relatedPaths.forEach(rp => {
          rp.style.fill = 'white';
          rp.style.transition = 'all 0.5s ease';
          prevPaths.push(rp);
        });
      });

      path.addEventListener('mouseout', () => {
        tooltipRef.current.style.display = 'none';
        prevPaths.forEach(rp => rp.style.fill = '#ffeabf');
        prevPaths.length = 0;
      });
    });

    setMunicipiosDisponibles(municipios);
  }, [svgContent]);

  // Search input
  const handleSearch = () => {
    const input = document.getElementById('search-input');
    const query = normalizeText(input.value.trim());
    if (!query) return alert('Por favor, ingrese un municipio para buscar.');

    // Limpiar prev paths
    document.querySelectorAll('path').forEach(p => p.style.fill = '#ffeabf');

    // Pintar nuevo
    const newPaths = document.querySelectorAll(`path[id="${query.split('_')[0]}"]`);
    newPaths.forEach(p => p.style.fill = 'white');

    buscarEnWikipedia(query);
  };

return (
  <div className={styles.page}>
    <div className={styles.container}>
      <div className={styles.sidebar} id="checkbox"></div>
      <div className={styles.mapContainer} id="mapa-container"></div>
    </div>
  </div>
);
}