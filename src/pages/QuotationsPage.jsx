import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { getQuotations } from "../services/quotation";
import "../styles/Quotation.css";
import "../styles/loader.css";

// const BASE_URL = "http://62.72.33.172:4000/";

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
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

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const res = await getQuotations(page, limit, filters);
      setQuotations(res.data);
      setTotal(res.total);
    } catch (err) {
      console.error("Quotation fetch failed:", err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchQuotations();
  };

  useEffect(() => {
    fetchQuotations();
  }, [page]);

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
                </tr>
              </thead>
              <tbody>
                {quotations.map((quotation) => (
                  <tr key={quotation._id}>
                    <td>
                      <img
                        src={`${quotation.image_url}`}
                        alt="Quotation"
                        className="quotation-thumbnail"
                      />
                    </td>
                    <td>{quotation.clientDetails.name}</td>
                    <td>{quotation.clientDetails.contactNumber}</td>
                    <td>{quotation.clientDetails.city}</td>
                    <td>{new Date(quotation.date).toLocaleDateString()}</td>
<td>
  ₹
  {quotation?.quotationSummary?.total !== undefined
    ? Math.ceil(quotation.quotationSummary.total).toLocaleString("en-IN")
    : 0}
</td>

                    <td>{quotation.user.name}
                      {/* {quotation.user.mobile} */}
                    </td>


                    <td>
                      <a
                        href={`${quotation.pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-pdf-button"
                      >
                        📄 View
                      </a>
                    </td>
                  </tr>
                ))}
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
