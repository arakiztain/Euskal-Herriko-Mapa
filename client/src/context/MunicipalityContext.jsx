import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserMunicipalities } from '../utils/fetchServer';

const MunicipalityContext = createContext();

export function MunicipalityProvider({ children }) {
  const [municipalities, setMunicipalities] = useState([]);

  const fetchMunicipalities = useCallback(async () => {
    try {
      const data = await getUserMunicipalities();
      console.log('Municipios del usuario:', data);
      setMunicipalities(data);
    } catch (error) {
      console.error('Error fetching municipalities:', error);
    }
  }, []);

  useEffect(() => {
    fetchMunicipalities();
  }, [fetchMunicipalities]);

  return (
    <MunicipalityContext.Provider value={{ municipalities, fetchMunicipalities }}>
      {children}
    </MunicipalityContext.Provider>
  );
}

export function useMunicipalities() {
  return useContext(MunicipalityContext);
}
