import axios from 'axios';

export const getQuotations = async (page, limit, filters = {}) => {
  const params = new URLSearchParams({
    page,
    limit,
    ...filters,
  });

  const response = await axios.get(`http://62.72.33.172:4000/backend/api/quotation?${params}`);
  return response.data;
};
