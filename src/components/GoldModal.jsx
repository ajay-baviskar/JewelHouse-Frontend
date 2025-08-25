import React, { useState, useEffect } from "react";

const GoldModal = ({ show, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    rate24k: "",
    rate22k: "",
    rate18k: "",
    rate14k: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Edit Gold Rate" : "Add Gold Rate"}</h3>
        <div className="form-group">
          <label>24K Rate</label>
          <input
            type="number"
            name="rate24k"
            value={formData.rate24k}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>22K Rate</label>
          <input
            type="number"
            name="rate22k"
            value={formData.rate22k}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>18K Rate</label>
          <input
            type="number"
            name="rate18k"
            value={formData.rate18k}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>14K Rate</label>
          <input
            type="number"
            name="rate14k"
            value={formData.rate14k}
            onChange={handleChange}
          />
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-update" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoldModal;
