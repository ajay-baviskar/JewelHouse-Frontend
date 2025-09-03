// File: src/components/ResetPasswordModal.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/modal.css";

const ResetPasswordModal = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }
    try {
      await axios.put(
        `http://62.72.33.172:4000/api/auth/users/${user._id}/password`,
        formData
      );
      alert("✅ Password reset successfully");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to reset password");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Reset Password</h2>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="modal-actions">
          <button className="btn-update" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
