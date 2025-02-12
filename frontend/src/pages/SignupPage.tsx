import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !phone || !address) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("/api/auth/signup", {
        username,
        email,
        password,
        phone,
        address,
      });
      console.log("Signup successful");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
        <div className="form-container">
      <h2 className="">Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="form-group">
          <label className="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            
          />
        </div>
        <div className="form-group">
          <label className="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            
          />
        </div>
        <div className='form-group'>
          <label className="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            
          />
        </div>
        <div className="phone-address">
        <div className="form-group">
          <label className="">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            
          />
        </div>
        <div className="form-group">
          <label className="">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder=
            "Address"
            
          />
        </div>
        </div>
        <div className="phone-address">
        <button
          type="submit"
          className='btn btn-primary'
        >
          Sign Up
        </button>
        <p>
        Already have a account?  <Link to={'/login'} > Login</Link>
        </p>
        </div>
       
       
      </form>
    </div>
    </div>
    
  );
};

export default SignupPage;
