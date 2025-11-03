import axios from "axios";

const API = "https://thejewelhouse.com/backend/api/gold"; // change {{localUrl}} if needed

export const fetchGoldRates = () => {
  return axios.get(`${API}/get-all-get`);
};

export const createGoldRate = (data) => {
  return axios.post(`${API}/create-gold`, data);
};

export const updateGoldRate = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteGoldRate = (id) => {
  return axios.delete(`${API}/${id}`);
};
