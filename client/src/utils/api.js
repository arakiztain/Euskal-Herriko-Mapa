import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/', // Cambia por tu URL backend
  withCredentials: true,
})

export default API
