import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DiamondFilter from "../../components/DiamondFilters";
import DiamondTable from "../../components/DiamondTable";
import Pagination from "../../components/Pagination";
import { fetchDiamonds, updateDiamond } from "../../services/diamond";
import CreateDiamondModal from "../../components/CreateDiamondModal";
import "../../styles/diamond.css";
import "../../styles/editModal.css";
import "../../styles/loader.css";
// import "../../styles/Dropdown.css"; // For styled dropdown
import axios from "axios";

const DiamondList = () => {
  const [filters, setFilters] = useState({});
  const [diamonds, setDiamonds] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // <-- Page limit
  const [total, setTotal] = useState(0);
  const [editingDiamond, setEditingDiamond] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  const loadDiamonds = async (currentPage = page, currentLimit = limit, currentFilters = filters) => {
    setLoading(true);
    try {
      const res = await fetchDiamonds({ ...currentFilters, page: currentPage, limit: currentLimit });
      setDiamonds(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  const handleEdit = (diamond) => {
    setEditingDiamond(diamond);
  };

  const handleUpdate = async (updatedData) => {
    const confirmUpdate = window.confirm("Are you sure you want to update the diamond?");
    if (!confirmUpdate) return;

    setLoading(true);
    await updateDiamond(updatedData._id, updatedData);
    setEditingDiamond(null);
    await loadDiamonds();
    setLoading(false);
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      const res = await axios.get("http://62.72.33.172:4000/backend/api/diamonds/download", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "diamonds.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export diamonds");
    }
    setExportLoading(false);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      setImportLoading(true);
      await axios.post("http://62.72.33.172:4000/backend/api/diamonds/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Import successful!");
      await loadDiamonds();
    } catch (err) {
      console.error("Import error:", err);
      alert("Failed to import diamonds");
    }
    setImportLoading(false);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setPage(1); // Reset to first page
    loadDiamonds(1, newLimit, filters);
  };

  useEffect(() => {
    loadDiamonds();
  }, [filters, page]);

  return (
    <Layout>
      <div className="diamond-page">
        <div className="page-header">
          <h1 className="page-title">💎 Diamond List</h1>

          <div className="button-group">
            <button className="register-btn" onClick={handleExport} disabled={exportLoading}>
              {exportLoading ? "Exporting..." : "Export Excel"}
            </button>

            <label className="register-btn">
              {importLoading ? "Importing..." : "Import Excel"}
              <input
                type="file"
                accept=".xlsx,.xls"
                style={{ display: "none" }}
                onChange={handleImport}
                disabled={importLoading}
              />
            </label>

            <button className="register-btn create-btn" onClick={() => setShowModal(true)}>
              + Create Diamond
            </button>
          </div>
        </div>

        <DiamondFilter filters={filters} setFilters={setFilters} />

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

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <DiamondTable diamonds={diamonds} onEdit={handleEdit} />
            <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
          </>
        )}

        {editingDiamond && (
          <EditModal diamond={editingDiamond} onUpdate={handleUpdate} onClose={() => setEditingDiamond(null)} />
        )}

        {showModal && <CreateDiamondModal onClose={() => setShowModal(false)} onCreated={loadDiamonds} />}
      </div>
    </Layout>
  );
};

export default DiamondList;

// Edit Modal Component
const EditModal = ({ diamond, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...diamond });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2>Edit Diamond</h2>

        <label>Size:</label>
        <input name="Size" value={formData.Size} onChange={handleChange} />

        <label>Color:</label>
        <input name="Color" value={formData.Color} onChange={handleChange} />

        <label>Shape:</label>
        <input name="Shape" value={formData.Shape} onChange={handleChange} />

        <label>Purity:</label>
        <input name="Purity" value={formData.Purity} onChange={handleChange} />

        <label>Discount:</label>
        <input name="Discount" value={formData.Discount} onChange={handleChange} />

        <label>Price:</label>
        <input name="Price" value={formData.Price} onChange={handleChange} />

        <div className="modal-actions">
          <button className="btn-update" onClick={handleSubmit}>
            Update
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
