import api from './api';

export const registerUser = async (username, email, password) => {
  const res = await api.post('/register', { username, email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post('/login', { email, password });
  return res.data; 
};

export const validateToken = async () => {
  try {
    const res = await api.get('/validate');
    return res.data;
  } catch (error) {
    console.error('Token expired:', error);
    return null;
  }
};

export const getUserMunicipalities = async () => {
  try {
    const res = await api.get('/municipality/user');

    return res.data;
  } catch (error) {
    console.error('Error fetching municipalities:', error);
    throw error;
  }
};

export const getMunicipalityCountsByProvince = async () => {
  try {
    const res = await api.get('/municipality/counts');
    return res.data;
  } catch (error) {
    console.error('Error fetching municipality counts:', error);
    throw error;
  }
}

export const addUserMunicipality = async (municipalityName) => {
  const res = await api.post('/municipality', { municipalityName });
  return res.data;
};


export const searchMunicipalitiesByName = async (name) => {
  const res = await api.get(`/municipality/search?name=${encodeURIComponent(name)}`);
  return res.data;
};

export const removeUserMunicipality = async (municipalityName) => {
  const res = await api.delete(`/municipality/${municipalityName}`);
  return res.data;
};
