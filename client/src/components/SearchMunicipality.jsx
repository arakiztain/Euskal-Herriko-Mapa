import { useState } from 'react';
import { useMunicipalities } from '../context/MunicipalityContext';
import { addUserMunicipality, searchMunicipalitiesByName } from '../utils/fetchServer';

export function SearchMunicipality() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { fetchMunicipalities } = useMunicipalities();

  const handleSearch = async () => {
    try {
      const data = await searchMunicipalitiesByName(search);
      setResults(data);
    } catch (error) {
      console.error('Error buscando municipios:', error);
    }
  };

  const handleAdd = async (municipalityName) => {
    try {
      await addUserMunicipality(municipalityName);
      await fetchMunicipalities();
    } catch (error) {
      console.error('Error añadiendo municipio:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Udalerria bilatu.."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Bilatu</button>

      <ul>
        {results.map(m => (
          <li key={m.id}>
            {m.name} ({m.province})
            <button onClick={() => handleAdd(m.name)}>Gehitu</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
