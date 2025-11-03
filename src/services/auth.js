import axios from 'axios';

const API = axios.create({
  baseURL: 'https://thejewelhouse.com/backend/api/auth',
});

export const register = (data) => API.post('/register', data);
export const login = (data) => API.post('/portal', data);
export const loginAdmin = (data) => API.post('/login-admin', data);

