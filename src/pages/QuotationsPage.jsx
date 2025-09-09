import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { getQuotations } from "../services/quotation";
import "../styles/Quotation.css";
import "../styles/loader.css";

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default page size
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    contactNumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchQuotations = async (currentPage = page, currentLimit = limit, currentFilters = filters) => {
    setLoading(true);
    try {
      const res = await getQuotations(currentPage, currentLimit, currentFilters);
      setQuotations(res.data || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error("Quotation fetch failed:", err);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchQuotations(1, limit, filters);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quotation?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await fetch(`http://62.72.33.172:4000/api/quotation/${id}`, {
        method: "DELETE",
      });
      alert("Quotation deleted successfully!");
      fetchQuotations(); // reload current page
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete quotation");
    }
    setLoading(false);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
    fetchQuotations(1, newLimit, filters);
  };

  useEffect(() => {
    fetchQuotations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // fetch whenever page changes

  const totalPages = Math.ceil(total / limit);

  return (
    <Layout>
      <div className="quotation-page">
        <h1 className="page-title">📄 Quotation List</h1>

        {/* Filter Controls */}
        <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            name="name"
            placeholder="Filter by Name"
            value={filters.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Filter by City"
            value={filters.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Filter by Contact Number"
            value={filters.contactNumber}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Filter by Email"
            value={filters.email}
            onChange={handleInputChange}
          />
          <button type="submit" className="view-pdf-button">
            🔍 Search
          </button>
        </form>

        {/* Page Limit Selector */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="pageLimit">Items per page: </label>
          <select id="pageLimit" value={limit} onChange={handleLimitChange}>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <table className="quotation-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Client Name</th>
                  <th>Mobile No</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Total (₹)</th>
                  <th>Created By</th>
                  <th>PDF</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {quotations.length > 0 ? (
                  quotations.map((quotation) => (
                    <tr key={quotation._id}>
                      <td>
                        <img
                          src={quotation.image_url || "/default-image.png"}
                          alt="Quotation"
                          className="quotation-thumbnail"
                        />
                      </td>
                      <td>{quotation.clientDetails?.name || "-"}</td>
                      <td>{quotation.clientDetails?.contactNumber || "-"}</td>
                      <td>{quotation.clientDetails?.city || "-"}</td>
                      <td>{quotation.date ? new Date(quotation.date).toLocaleDateString() : "-"}</td>
                      <td>
                        ₹
                        {quotation?.quotationSummary?.total !== undefined
                          ? Math.ceil(quotation.quotationSummary.total).toLocaleString("en-IN")
                          : 0}
                      </td>
                      <td>{quotation.user?.name || "-"}</td>
                      <td>
                        {quotation.pdfUrl ? (
                          <a
                            href={quotation.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-pdf-button"
                          >
                            📄 View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(quotation._id)}
                        >
                          ❌ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No quotations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              page={page}
              total={total}
              limit={limit}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default QuotationsPage;
