import axios from 'axios';

export const getQuotations = async (page, limit) => {
  const response = await axios.get(`http://62.72.33.172:4000/api/quotation?page=${page}&limit=${limit}`);
  return response.data;
};
