import axios from "axios";

const API_BASE = "http://62.72.33.172:4000/api/order";

export const fetchOrders = (page = 1, limit = 10) =>
  axios.get(`${API_BASE}/orders-history?page=${page}&limit=${limit}`);

export const updateOrderStatus = (orderId, orderStatus) =>
  axios.put(`${API_BASE}/${orderId}/status`, { orderStatus });
