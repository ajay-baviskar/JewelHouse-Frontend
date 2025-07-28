// src/pages/diamond/DiamondList.jsx
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DiamondFilter from "../../components/DiamondFilters";
import DiamondTable from "../../components/DiamondTable";
import Pagination from "../../components/Pagination";
import { fetchDiamonds } from "../../services/diamond";
import "../../styles/diamond.css";

const DiamondList = () => {
  const [filters, setFilters] = useState({});
  const [diamonds, setDiamonds] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const loadDiamonds = async () => {
    try {
      const res = await fetchDiamonds({ ...filters, page, limit });
      setDiamonds(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    loadDiamonds();
  }, [filters, page]);

  return (
    <Layout>
      <div className="diamond-page">
        <h1 className="page-title">💎 Diamond List</h1>
        <DiamondFilter filters={filters} setFilters={setFilters} />
        
        <DiamondTable diamonds={diamonds} />

        <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
      </div>
    </Layout>
  );
};

export default DiamondList;
