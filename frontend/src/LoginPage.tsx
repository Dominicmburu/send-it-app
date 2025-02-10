import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    try {

        // Hardcoded admin credentials
      if (email === "admin.sendit@email.com" && password === "admin1234") {
        console.log("Admin login successful");
        localStorage.setItem("token", "admin-token");
        localStorage.setItem("role", "admin");
        navigate("/admin-dashboard");
        return;
      }
      
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // check if the response is successful
      if(response.data.token){
      console.log("Login successful", response.data);
      // Save token and role, then redirect user to dashboard
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "user");
      navigate("/user-dashboard");

      } else {
        setError("Invalid credentials. Please try again.");}
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
        <div className="form-container">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="phone-address">
            <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
        <p>Have no account? <Link to={'/signup'}>SignUp</Link></p>
        </div>
      </form>
        </div>
      
    </div>
  );
};

export default LoginPage;
