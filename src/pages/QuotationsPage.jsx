import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { getQuotations } from "../services/quotation";
import "../styles/Quotation.css";
import "../styles/loader.css";

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const res = await getQuotations(page, limit);
      setQuotations(res.data);
      setTotal(res.total);
    } catch (err) {
      console.error("Quotation fetch failed:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotations();
  }, [page]);

  return (
    <Layout>
      <div className="quotation-page">
        <h1 className="page-title">📄 Quotation List</h1>

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
                  <th>City</th>
                  <th>Date</th>
                  <th>Total (₹)</th>
                </tr>
              </thead>
             <tbody>
  {quotations.map((quotation) => (
    <tr key={quotation._id}>
      <td>
        <img
                        src={quotation.image_url}
                        alt="Quotation"
                        className="quotation-thumbnail"
                      />
      </td>
      <td>{quotation.clientDetails.name}</td>
      <td>{quotation.clientDetails.city}</td>
      <td>{new Date(quotation.date).toLocaleDateString()}</td>
      <td>₹{quotation.quotationSummary.total}</td>
    </tr>
  ))}
</tbody>

            </table>

            <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default QuotationsPage;
