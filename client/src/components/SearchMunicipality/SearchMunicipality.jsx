import { useState, useEffect } from 'react';
import { useMunicipalities } from '../../context/MunicipalityContext';
import { addUserMunicipality, searchMunicipalitiesByName } from '../../utils/fetchServer';
import styles from './SearchMunicipality.module.css'; // Opcional si quieres estilos

export function SearchMunicipality() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { fetchMunicipalities } = useMunicipalities();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim().length >= 2) {
        searchMunicipalitiesByName(search.trim())
          .then(setResults)
          .catch((err) => console.error("Error buscando:", err));
      } else {
        setResults([]);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleAdd = async (municipalityName) => {
    try {
      await addUserMunicipality(municipalityName);
      await fetchMunicipalities();
      setSearch(''); // Limpiar campo
      setResults([]); // Limpiar sugerencias
    } catch (error) {
      console.error('Error añadiendo municipio:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      const exactMatch = results.find(
        (m) => m.name.toLowerCase() === search.trim().toLowerCase()
      );
      const municipality = exactMatch || results[0];
      handleAdd(municipality.name);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Udalerria bilatu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />

      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((m) => (
            <li
              key={m.id}
              onClick={() => handleAdd(m.name)}
              className={styles.resultItem}
            >
              {m.name} ({m.province})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
