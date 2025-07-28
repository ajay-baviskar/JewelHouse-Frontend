// src/services/diamondService.js
import axios from 'axios';

const API = 'http://62.72.33.172:4000/api/diamonds';

export const fetchDiamonds = (params) => {
  return axios.get(`${API}/all`, { params });
};

export const fetchDropdowns = () => {
  return axios.get(`${API}/dropdowns`);
};
