import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { CiSearch, CiNoWaitingSign } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import CreateParcelForm from "../components/CreateParcelView";
import Notification from "../components/Notification";

const AdminDashboard: React.FC = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);

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
      <div className="navbar-wrapper">
        <div className="navbar-container">
          {/* Navbar welcome message( Welcome Admin), search bar and logout button */}
          <nav className="navbar">
            <div className="admin-logo">
              <img
                src="./src/images/senditlogo.png"
                alt=""
                className="admin-logo-image"
              />
            </div>
            <div className="search-input">
              <input type="text" placeholder="Search parcels" />
              <CiSearch className="icon" />
            </div>

            <div className="logout">
              <p>
                Welcome,
                <br />
                <strong> Admin</strong>
              </p>
              <div
                className="notification"
                onClick={() => {
                  setShowNotification(true);
                }}
              >
                <IoIosNotifications className="theme" />
              </div>
              {showNotification && <Notification />}
              <button
                className="btn"
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
        <div className="container">
          <div className="create-parcel-container">
            {/* Link to view all parcels */}
            <div style={{ width: "200px" }}>
              <Link
              data-cy='view-all-parcels'
                to="/admin-dashboard/parcels"
                className="back-link"
                style={{ marginTop: "5rem", marginBottom: "2rem" }}
              >
                <FaEye />
                View all parcels
              </Link>
            </div>
            <div style={{ width: "100%" }}>
              {/* Form to create a parcel */}
              <h4 style={{ paddingBottom: "1rem" }}>Create a parcel</h4>
              {error && <p className="error">{error}</p>}
              <CreateParcelForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
