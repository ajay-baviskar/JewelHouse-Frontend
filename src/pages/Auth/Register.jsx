import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ⬅️ Add Link and useNavigate
import "../../styles/Auth.css";
import Input from "../../components/Input";

const Register = () => {
  const navigate = useNavigate(); // ⬅️ For redirecting
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "MOBILE", // Default role
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://62.72.33.172:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setMessageType("success");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          role: "MOBILE",
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message || "❌ Registration failed. Try again.");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error. Please try again later.");
      setMessageType("error");
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {message && (
          <div className={`form-message ${messageType}`}>{message}</div>
        )}

        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
        <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Role Dropdown */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="MOBILE">MOBILE</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Register</button>

        {/* ✅ Login Link */}
        <p style={{ marginTop: "12px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
