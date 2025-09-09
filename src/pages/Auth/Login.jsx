import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";
import "../../styles/loader.css"; // ✅ Import loader styles
import Input from "../../components/Input";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const [isLoading, setIsLoading] = useState(false);  // ✅ New loader state

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start loading

    try {
      const res = await fetch("http://62.72.33.172:4000/api/auth/login-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful!");
        setMessageType("success");
        localStorage.setItem("token", data.token);

        setTimeout(() => {
          navigate("/dashboard/home");
        }, 1000);
      } else {
        setMessage(data.message || "❌ Invalid credentials.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("❌ Network error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false); // ✅ Stop loading
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
          <p>Logging in...</p>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="logo-container">
            <img src="http://62.72.33.172:4000/images/1755179872326-Copy of Untitled Design-Photoroom (1).png" alt="Logo" className="auth-logo" />
          </div>
          <h2>Login</h2>

          {message && <div className={`form-message ${messageType}`}>{message}</div>}

          <Input
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Login
          </button>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
