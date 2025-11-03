import axios from 'axios';

export const getQuotations = async (page, limit, filters = {}) => {
  const params = new URLSearchParams({
    page,
    limit,
    ...filters,
  });

  const response = await axios.get(`https://thejewelhouse.com/backend/api/quotation?${params}`);
  return response.data;
};
