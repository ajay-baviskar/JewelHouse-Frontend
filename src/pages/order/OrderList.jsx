import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchOrders, updateOrderStatus } from "../../services/orderService";
import "../../styles/order.css";
import "../../styles/loader.css";
// import "../../styles/Dropdown.css"; // Add this for styled dropdown

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // <-- Added state for items per page
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    contactNumber: "",
    pinCode: "",
    email: "",
    orderStatus: ""
  });

  const loadOrders = async (currentPage = page, currentLimit = limit, currentFilters = filters) => {
    try {
      setIsLoading(true);
      const res = await fetchOrders(currentPage, currentLimit, currentFilters);
      setOrders(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setPage(1); // Reset to page 1 on new filter
    loadOrders(1, limit, filters);
  };

  const clearFilters = () => {
    const resetFilters = { name: "", contactNumber: "", pinCode: "", email: "", orderStatus: "" };
    setFilters(resetFilters);
    setPage(1);
    loadOrders(1, limit, resetFilters);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const confirmChange = window.confirm(`Change status to "${newStatus}"?`);
    if (!confirmChange) return;

    try {
      setStatusUpdatingId(orderId);
      await updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setPage(1);
    loadOrders(1, newLimit, filters);
  };

  useEffect(() => {
    loadOrders();
  }, [page]);

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
          <button type="submit" onClick={applyFilters} className="view-pdf-button">🔍 Search</button>
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
                  {/* <th>Payment</th> */}
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
                      {/* <td>{order.paymentStatus}</td> */}
                      <td>{order.orderStatus}</td>
                      <td>{order.userId.name}</td>
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
                    <td colSpan="7">No Orders Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && (
          <div className="pagination-controls">
            <button disabled={!hasPrev} onClick={() => setPage((prev) => prev - 1)}>Previous</button>
            <span>Page {page}</span>
            <button disabled={!hasNext} onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderList;
