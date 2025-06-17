import api from './api';

export const registerUser = async (username, email, password) => {
  const res = await api.post('/register', { username, email, password });
  return res.data; // { token: ..., ... }
};

export const loginUser = async (email, password) => {
  const res = await api.post('/login', { email, password });
  return res.data; // { token: ..., ... }
};

export const getUserMunicipalities = async () => {
  try {
    const res = await api.get('/municipality/user');
    return res.data;
  } catch (error) {
    console.error('Error fetching municipalities:', error);
    throw error; // o devuelve un valor por defecto si quieres
  }
};

export const addUserMunicipality = async (municipalityId) => {
  const res = await api.post('/municipality', { municipalityId });
  return res.data;
};

export const removeUserMunicipality = async (municipalityId) => {
  const res = await api.delete(`/municipality/${municipalityId}`);
  return res.data;
};
