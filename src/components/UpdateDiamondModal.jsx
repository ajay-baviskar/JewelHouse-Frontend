// src/components/UpdateDiamondModal.jsx
import React, { useState, useEffect } from "react";
import "../styles/diamond.css";

const UpdateDiamondModal = ({ diamond, onClose, onSave }) => {
  const [form, setForm] = useState({
    Size: "",
    Color: "",
    Shape: "",
    Purity: "",
    Discount: "",
    Price: "",
  });

  useEffect(() => {
    if (diamond) {
      setForm(diamond);
    }
  }, [diamond]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onSave(form);
    onClose();
  };

  if (!diamond) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Diamond</h2>
        <div className="form-group">
          <label>Size</label>
          <input name="Size" value={form.Size} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Color</label>
          <input name="Color" value={form.Color} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Shape</label>
          <input name="Shape" value={form.Shape} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Purity</label>
          <input name="Purity" value={form.Purity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Discount</label>
          <input name="Discount" value={form.Discount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input name="Price" value={form.Price} onChange={handleChange} />
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-update" onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDiamondModal;
