import React, { useState } from "react";
import "./Login.css";
import { adminLogin } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔐 Login attempt started");
    console.log("📧 Email:", email);

    try {
      const res = await adminLogin({ email, password });

      console.log("✅ Backend response:", res);

      if (res.token) {
        localStorage.setItem("adminToken", res.token);
        console.log("🎉 Login successful, token stored");

        toast.success("Login successful "); // ✅ toast instead of error message
        if (onLogin) onLogin(); 
        navigate("/dashboard"); 
      } else {
        console.warn("⚠️ No token received");
        toast.error("Invalid credentials "); // ✅ toast
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      toast.error(err.response?.data?.message || "Invalid Credentials "); // ✅ toast
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
