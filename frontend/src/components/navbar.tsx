import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user.username) {            
          setUsername(response.data.user.username);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate("/login"); 
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("username");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="admin-logo">
          <img src="./src/images/senditlogo.png" alt="Logo" className="admin-logo-image" />
        </div>
        <div className="search-input">
          <input type="text" placeholder="Search parcels" />
          <CiSearch className="icon" />
        </div>
        <div className="logout">
          <p>
            Welcome,
            <br />
            <strong>{username}</strong>
          </p>
          <div className="notification">
            <IoIosNotifications className="theme" />
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
