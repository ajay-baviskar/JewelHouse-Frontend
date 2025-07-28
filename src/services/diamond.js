import axios from 'axios';

const API = 'http://62.72.33.172:4000/api/diamonds';

export const fetchDiamonds = (params) =>
  axios.get(`${API}/all`, { params });

export const fetchDropdowns = () =>
  axios.get(`${API}/dropdowns`);


export const updateDiamond = async (id, data) => {
  const res = await fetch(`http://62.72.33.172:4000/api/diamonds/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
