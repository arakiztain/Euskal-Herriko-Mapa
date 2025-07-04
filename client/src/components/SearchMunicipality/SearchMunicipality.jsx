import { useState, useEffect, useRef } from 'react';
import { useMunicipalities } from '../../context/MunicipalityContext';
import { addUserMunicipality, searchMunicipalitiesByName } from '../../utils/fetchServer';
import styles from './SearchMunicipality.module.css';

export function SearchMunicipality() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { municipalities, fetchMunicipalities } = useMunicipalities();
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const containerRef = useRef(null);

  const performSearch = (query) => {
    if (query.trim().length >= 2) {
      searchMunicipalitiesByName(query.trim())
        .then((data) => {
          const filtered = data
            .filter(m =>
              m.name.toLowerCase().startsWith(query.trim().toLowerCase())
            )
            .filter(m =>
              !municipalities.some(sel => sel.name.toLowerCase() === m.name.toLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name, 'eu', { sensitivity: 'base' }));
          setResults(filtered);
          setError(filtered.length === 0);
        })
        .catch((err) => {
          console.error("Error buscando:", err);
          setResults([]);
          setError(true);
        });
    } else {
      setResults([]);
      setError(true);
    }
  };

  useEffect(() => {
    if (!hasSearched) {
      if (search.trim().length >= 2) {
        const delayDebounce = setTimeout(() => {
          performSearch(search);
          setError(false);
        }, 300);

        return () => clearTimeout(delayDebounce);
      } else {
        setResults([]);
      }
    }
  }, [search, municipalities, hasSearched]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
        setHighlightedIndex(-1);
        setError(false);
        setHasSearched(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [search]);

  const handleAdd = async (municipalityName) => {
    try {
      await addUserMunicipality(municipalityName);
      await fetchMunicipalities();
      setSearch('');
      setResults([]);
      setError(false);
      setHasSearched(false);
    } catch (error) {
      console.error('Error añadiendo municipio:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (results.length === 1 && e.key === 'Enter') {
      e.preventDefault();
      handleAdd(results[0].name);
    } else if (results.length > 1) {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev === 0 ? results.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        handleAdd(results[highlightedIndex].name);
      } else if (e.key === 'Escape') {
        setResults([]);
        setHighlightedIndex(-1);
      }
    }
    if (e.key === 'Enter') {
      setHasSearched(true);
      performSearch(search);
    }
  };

  const handleButtonClick = () => {
    setHasSearched(true);
    performSearch(search);
  };

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <div className={styles.inputButtonWrapper}>
        <input
          type="text"
          placeholder="Udalerria bilatu..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setError(false);
            setHasSearched(false);
          }}
          onKeyDown={handleKeyDown}
          className={`${styles.input} ${hasSearched && error ? styles.error : ''}`}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className={`${styles.searchButton} ${hasSearched && error ? styles.errorButton : ''}`}
          aria-label="Udalerria bilatu"
        >
          Bilatu
        </button>
      </div>

      {results.length > 0 ? (
        <ul className={styles.resultsList}>
          {results.map((m, idx) => (
            <li
              key={m.id}
              onClick={() => handleAdd(m.name)}
              className={`${styles.resultItem} ${idx === highlightedIndex ? styles.highlighted : ''}`}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              {m.name} ({m.province})
            </li>
          ))}
        </ul>
      ) : (
        hasSearched && error && (
          <ul className={styles.resultsList}>
            <li className={`${styles.resultItem} ${styles.noResults}`}>
              Ez dago udalerriik izen horrekin.
            </li>
          </ul>
        )
      )}
    </div>
  );
}
