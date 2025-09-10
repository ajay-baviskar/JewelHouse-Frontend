import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchOrders, updateOrderStatus } from "../../services/orderService";
import "../../styles/order.css";
import "../../styles/loader.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    contactNumber: "",
    pinCode: "",
    email: "",
    orderStatus: "",
  });

  // fetch orders
  const loadOrders = async (currentPage = page, currentLimit = limit, currentFilters = filters) => {
    try {
      setIsLoading(true);
      const res = await fetchOrders(currentPage, currentLimit, currentFilters);
      setOrders(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  // filters
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setPage(1);
    loadOrders(1, limit, filters);
  };

  const clearFilters = () => {
    const resetFilters = { name: "", contactNumber: "", pinCode: "", email: "", orderStatus: "" };
    setFilters(resetFilters);
    setPage(1);
    loadOrders(1, limit, resetFilters);
  };

  // status change
  const handleStatusChange = async (orderId, newStatus) => {
    if (!window.confirm(`Change status to "${newStatus}"?`)) return;

    try {
      setStatusUpdatingId(orderId);
      await updateOrderStatus(orderId, newStatus);
      loadOrders(page, limit, filters); // refresh current page
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // items per page
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setPage(1); // reset to first page
    setLimit(newLimit);
  };

  // fetch whenever page/limit/filters change
  useEffect(() => {
    loadOrders(page, limit, filters);
  }, [page, limit, filters]);

  const hasPrev = page > 1;
  const hasNext = page * limit < total;

  return (
    <Layout>
      <div className="order-page">
        <h1 className="page-title">📦 Order List</h1>

        {/* Filter Section */}
        <div className="filter-container">
          <input name="name" placeholder="Customer Name" value={filters.name} onChange={handleFilterChange} />
          <input name="contactNumber" placeholder="Contact Number" value={filters.contactNumber} onChange={handleFilterChange} />
          <input name="pinCode" placeholder="Pin Code" value={filters.pinCode} onChange={handleFilterChange} />
          <input name="email" placeholder="Email" value={filters.email} onChange={handleFilterChange} />
          <select name="orderStatus" value={filters.orderStatus} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="placed">Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <button onClick={applyFilters} className="view-pdf-button">🔍 Search</button>
        </div>

        {/* Items per page dropdown */}
        <div className="items-per-page">
          <span>Items per page:</span>
          <div className="custom-select">
            <select value={limit} onChange={handleLimitChange}>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner" />
            <p>Loading orders...</p>
          </div>
        ) : (
          <div className="order-table-wrapper">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Change Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.customerDetails?.name}</td>
                      <td>{order.customerDetails?.address}<br />{order.customerDetails?.pinCode}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.userId?.name}</td>
                      <td>
                        <select
                          className="status-select"
                          value={order.orderStatus}
                          disabled={statusUpdatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="placed">Placed</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        {statusUpdatingId === order._id && <span className="small-loader" />}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Orders Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && total > 0 && (
          <div className="pagination-controls">
            <button disabled={!hasPrev} onClick={() => setPage((prev) => prev - 1)}>Previous</button>
            <span>Page {page} of {Math.ceil(total / limit)}</span>
            <button disabled={!hasNext} onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderList;
