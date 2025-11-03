// src/services/diamondService.js
import axios from 'axios';

const API = 'https://thejewelhouse.com/backend/api/diamonds';

export const fetchDiamonds = (params) => {
  return axios.get(`${API}/all`, { params });
};

export const fetchDropdowns = () => {
  return axios.get(`${API}/dropdowns`);
};
