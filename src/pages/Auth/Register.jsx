import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";
import "../../styles/loader.css"; // ✅ Import loader styles
import Input from "../../components/Input";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "ADMIN",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start loader

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

        setTimeout(() => {
          navigate("/portal");
        }, 2000);
      } else {
        setMessage(data.message || "❌ Registration failed. Try again.");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error. Please try again later.");
      setMessageType("error");
    } finally {
      setIsLoading(false); // ✅ Stop loader
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  return (
    <div className="auth-container">
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner" />
          <p>Registering...</p>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="logo-container">
            <img src="http://62.72.33.172:4000/images/1755179872326-Copy of Untitled Design-Photoroom (1).png" alt="Logo" className="auth-logo" />
          </div>
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

          <button type="submit" className="submit-btn">Register</button>

          <p style={{ marginTop: "12px", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/portal" style={{ color: "#007bff", textDecoration: "underline" }}>
              Login here
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
