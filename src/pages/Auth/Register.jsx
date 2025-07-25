import { useState } from "react";
import "../../styles/Auth.css";
import Input from "../../components/Input";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
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
        setMessage("✅ Registration successful!");
        setMessageType("success");
        setFormData({ name: "", email: "", mobile: "", password: "" });
      } else {
        setMessage(data.message || "❌ Registration failed. Try again.");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error. Please try again later.");
      setMessageType("error");
    }

    // Auto-clear message after 5 seconds
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
          <div className={`form-message ${messageType}`}>
            {message}
          </div>
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
      </form>
    </div>
  );
};

export default Register;
