import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import Input from "../../components/Input";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://62.72.33.172:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful!");
        setMessageType("success");
        localStorage.setItem("token", data.token); // store token
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage(data.message || "❌ Invalid credentials.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("❌ Network error. Please try again.");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default Login;
