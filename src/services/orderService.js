import axios from "axios";

const API_BASE = "http://62.72.33.172:4000/api/order";

export const fetchOrders = (page = 1, limit = 10, filters = {}) => {
  const params = new URLSearchParams({ page, limit });

  // Add filters dynamically
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  });

  return axios.get(`${API_BASE}/orders-history?${params.toString()}`);
};

export const updateOrderStatus = (orderId, orderStatus) =>
  axios.put(`${API_BASE}/${orderId}/status`, { orderStatus });
