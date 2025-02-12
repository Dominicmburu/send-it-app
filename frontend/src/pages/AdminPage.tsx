import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


import { CiSearch, CiNoWaitingSign } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import CreateParcelForm from "../components/CreateParcelView";

const AdminDashboard: React.FC = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  // const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("Token:", token);
    console.log("Role:", role);

    if (!token || role !== "admin") {
      console.log("Redirecting to login...");
      navigate("/login");
    }
    fetchParcels();
  }, [navigate]);

  const fetchParcels = async () => {
    try {
      const response = await axios.get("/api/parcels");
      setParcels(response.data);
    } catch (err) {
      setError("Failed to fetch parcels");
    }
  };

  // const handleCreateParcel = async () => {
  //   try {
  //     await axios.post("/api/parcels", {
  //       ...newParcel,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     });
  //     fetchParcels();
  //     setShowModal(false);
  //   } catch (err) {
  //     setError("Failed to create parcel");
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  

  return (
    <>
      {/* Navbar */}
      <div className="navbar-wrapper" style={{position: "fixed", width: "100%"}}>
        <div className="navbar-container">
          {/* Navbar welcome message( Welcome Admin), search bar and logout button */}
          <nav className="navbar">
            <div className="admin-logo">
              <img
                src="./src/images/senditlogo.png"
                alt=""
                className="admin-logo-image"
              />
              <p>
                Welcome,<strong> Admin</strong>
              </p>
            </div>
            <div className="search-input">
              <input type="text" placeholder="Search parcels" />
              <CiSearch className="icon" />
            </div>
            <div className="logout">
              <div className="notification">
                <IoIosNotifications className="theme" />
              </div>
              <button
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="wrapper">
        <div className="container" >
          {/* Link to view all parcels */}
        
          <Link to="/admin-dashboard/parcels" 
          className="back-link" style={{marginTop: "5rem"}}>
            <FaEye />
            View all parcels
          </Link>
        
        {/* Form to create a parcel */}
        <h4>Create a parcel</h4>
        {error && <p className="error">{error}</p>}
        <CreateParcelForm/>
        </div>
      </div>
    </>
  );
};


export default AdminDashboard;