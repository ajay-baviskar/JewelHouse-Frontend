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
  const [pdfLoadingId, setPdfLoadingId] = useState(null);
const [deletingId, setDeletingId] = useState(null);

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
            <option value="pending">PENDING</option>
            <option value="placed">PLACED</option>
            <option value="confirmed">CONFIRMED</option>
            <option value="shipped">SHPIPPED</option>
            <option value="delivered">DELIVERED</option>
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
                  <th>View PDF</th> {/* Added */}
                                    <th>Delete Order</th> {/* Added */}

                </tr>
              </thead>

              <tbody>
                {orders.length ? (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.customerDetails?.name}</td>
                      <td>
                        {order.customerDetails?.address}
                        <br />
                        {order.customerDetails?.pinCode}
                      </td>
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
                          <option value="pending">PENDING</option>
                          <option value="placed">PLACED</option>
                          <option value="confirmed">CONFIRMED</option>
                          <option value="shipped">SHPIPPED</option>
                          <option value="delivered">DELIVERED</option>
                        </select>
                        {statusUpdatingId === order._id && <span className="small-loader" />}
                      </td>
                      <td>
                        <button
                          className="view-pdf-button"
                          disabled={pdfLoadingId === order._id}
                          onClick={async () => {
                            try {
                              setPdfLoadingId(order._id); // start loader
                              const res = await fetch(
                                `http://62.72.33.172:4000/backend/api/order/generate-pdf/${order._id}`
                              );
                              const data = await res.json();
                              if (data.success && data.pdfUrl) {
                                window.open(data.pdfUrl, "_blank");
                              } else {
                                alert("Failed to generate PDF. Please try again.");
                              }
                            } catch (error) {
                              console.error("Error fetching PDF:", error);
                              alert("Error while generating PDF.");
                            } finally {
                              setPdfLoadingId(null); // stop loader
                            }
                          }}
                        >
                          {pdfLoadingId === order._id ? (
                            <span className="small-loader" />
                          ) : (
                            "📄"
                          )}
                        </button>
                      </td>

                   <td>
  <button
    className="delete-btn"
    disabled={deletingId === order._id || isLoading}
    onClick={async () => {
      if (!window.confirm("Are you sure you want to delete this order?")) return;

      try {
        setDeletingId(order._id); // start loader on button

        const res = await fetch(
          `http://62.72.33.172:4000/backend/api/order/delete/${order._id}`,
          { method: "DELETE" }
        );
        const data = await res.json();
        console.log("Delete response:", data);

        if (data.success) {
          alert("Order deleted successfully!");

          // ✅ Immediately remove order from local state
          setOrders((prev) => prev.filter((o) => o._id !== order._id));

          // ✅ Refresh from API to ensure sync with backend
          setTimeout(() => {
            loadOrders(page, limit, filters);
          }, 500);
        } else {
          alert(data.message || "Failed to delete order.");
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Error while deleting order.");
      } finally {
        setDeletingId(null); // stop loader on button
      }
    }}
    title="Delete Order"
  >
    {deletingId === order._id ? (
      <span className="small-loader" />
    ) : (
      <i className="bi bi-trash"></i>
    )}
  </button>
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
