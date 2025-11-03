import axios from 'axios';

const API = 'https://thejewelhouse.com/backend/api/diamonds';

export const fetchDiamonds = (params) =>
  axios.get(`${API}/all`, { params });

export const fetchDropdowns = () =>
  axios.get(`${API}/dropdowns`);


export const updateDiamond = async (id, data) => {
  const res = await fetch(`https://thejewelhouse.com/backend/api/diamonds/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};



export const createDiamond = async (data) => {
  const res = await fetch(`${API}/create-diamonds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};