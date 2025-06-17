import axios from 'axios';

// const token = localStorage.getItem('token');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUwMTg0Mjk4LCJleHAiOjE3NTAyNzA2OTh9.wkII6iiFY3qa7s2XV3eo9CzvpFGPX7FwnqhoSPhjapU';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

export default api;
