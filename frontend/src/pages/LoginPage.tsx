import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      

      if (response.data.token) {
        const decodedToken: { user_id: string; role: string } = jwtDecode(
          response.data.token
        );
        
        console.log(decodedToken);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", decodedToken.user_id);
        localStorage.setItem("role", decodedToken.role);

        console.log(decodedToken.role)

        if (decodedToken.role === "admin") {
          navigate("/admin-dashboard");
        } else if (decodedToken.role === "user") {
          navigate("/user-dashboard");
        } else {
          
          setError(response.data.message);
        }

      } else {
        // setError(response.data.message);
        setError('Invalid credentials. Please try again.')

        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {

      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h4 data-cy='login-title'>Login</h4>
        {error && <p className="error" data-cy='error'>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              data-cy="username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              data-cy='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="phone-address">
            <button type="submit" className="btn btn-primary" data-cy='login-btn'>
              Login
            </button>
            <p>
              Have no account? <Link to={"/signup"}>SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
