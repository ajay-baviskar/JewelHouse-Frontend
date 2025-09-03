import React, { useState } from "react";
import { createDiamond } from "../services/diamond";
import "../styles/editModal.css";

const CreateDiamondModal = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    Size: "",
    Color: "",
    Shape: "",
    Purity: "",
    Discount: "",
    Price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createDiamond(formData);
      alert("✅ Diamond created successfully!");
      onCreated(); // reload list
      onClose();
    } catch (error) {
      console.error("Create error:", error);
      alert("❌ Failed to create diamond");
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2>Create Diamond</h2>
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
            Create
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDiamondModal;
