import { useState } from "react";
import "../styles/registerModal.css";

const RegisterModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "MOBILE",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://62.72.33.172:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ User registered successfully.");
        onSuccess();
      } else {
        setMessage(`❌ ${data.message || "Failed to register."}`);
      }
    } catch (err) {
      setMessage("❌ Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="register-modal-overlay">
      <div className="register-modal">
        <h2>Register User</h2>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="MOBILE">Mobile</option>
          <option value="ADMIN">Admin</option>
        </select>

        {message && <div className="form-message">{message}</div>}

        <div className="modal-actions">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
