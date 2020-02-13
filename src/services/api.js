import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.technow.net.br'
});


export default api;