import React, { useState, useEffect } from "react";

const GoldModal = ({ show, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    rate9k:"",
    rate24k: "",
    rate22k: "",
    rate18k: "",
    rate14k: "",
    rate999Platinum: "",
    rate925Silver:""
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
          <label>9K Rate</label>
          <input
            type="number"
            name="rate9k"
            value= {formData.rate9k}
            onChange={handleChange}
          />
        </div>
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


           <div className="form-group">
          <label>999 Platinum</label>
          <input
            type="number"
            name="rate999Platinum"
            value={formData.rate999Platinum}
            onChange={handleChange}
          />
        </div>


 <div className="form-group">
          <label>925 Silver</label>
          <input
            type="number"
            name="rate925Silver"
            value={formData.rate925Silver}
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
