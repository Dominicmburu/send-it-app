import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://127.0.0.1:5000/api/auth/register", {
        username,
        email,
        password,
        phone_number: phoneNumber,
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
      <h4 className="">Sign Up</h4>
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
