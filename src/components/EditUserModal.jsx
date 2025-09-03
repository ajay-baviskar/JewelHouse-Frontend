// File: src/components/EditUserModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/modal.css";

const EditUserModal = ({ user, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        role: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                mobile: user.mobile || "",
                role: user.role || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://62.72.33.172:4000/api/auth/users/${user._id}`,
                formData
            );
            alert("✅ User updated successfully");
            onSuccess();
        } catch (err) {
            console.error(err);
            alert("❌ Failed to update user");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit User</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Mobile</label>
                    <input name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        className="styled-select"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="btn-update" onClick={handleUpdate}>
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

export default EditUserModal;
