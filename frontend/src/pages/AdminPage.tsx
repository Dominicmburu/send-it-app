import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import CreateParcelForm from "../components/CreateParcelView";
import Notification from "../components/Notification";

interface Parcel {
  parcel_id: number;
  sender_id: number;
  receiver_id: number;
  pickup_location: string;
  destination: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
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
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/parcels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && Array.isArray(response.data.parcels)) {
        setParcels(response.data.parcels);
      } else if (Array.isArray(response.data)) {
        setParcels(response.data);
      } else {
        console.error("Unexpected response format for parcels:", response.data);
        setParcels([]);
      }
    } catch (err) {
      setError("Failed to fetch parcels");
    }
  };
  

  const updateParcelStatus = async (parcel_id: number) => {
    const newStatus = prompt("Enter new status (pending, in transit, delivered, cancelled):");
    if (!newStatus) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/admin/parcel/status",
        { parcel_id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchParcels();
    } catch (err) {
      setError("Failed to update parcel status");
    }
  };

  const updateParcelDetails = async (parcel_id: number) => {
    const newPickup = prompt("Enter new pickup location:");
    const newDestination = prompt("Enter new destination:");
    if (!newPickup || !newDestination) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/admin/parcel/details",
        { parcel_id, pickup_location: newPickup, destination: newDestination },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchParcels();
    } catch (err) {
      setError("Failed to update parcel details");
    }
  };

  const deleteParcel = async (parcel_id: number) => {
    if (!window.confirm("Are you sure you want to delete this parcel?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/parcel/${parcel_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchParcels();
    } catch (err) {
      setError("Failed to delete parcel");
    }
  };

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
          <nav className="navbar">
            <div className="admin-logo">
              <img
                src="./src/images/senditlogo.png"
                alt="logo"
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
                onClick={() => setShowNotification(true)}
              >
                <IoIosNotifications className="theme" />
              </div>
              {showNotification && <Notification />}
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="wrapper">
        <div className="container">
          <div className="create-parcel-container">
            <div style={{ width: "200px" }}>
              <Link
                to="/admin-dashboard/parcels"
                className="back-link"
                style={{ marginTop: "5rem", marginBottom: "2rem" }}
              >
                <FaEye /> View all parcels
              </Link>
            </div>
            <div style={{ width: "100%" }}>
              <h4 style={{ paddingBottom: "1rem" }}>Create a parcel</h4>
              {error && <p className="error">{error}</p>}
              <CreateParcelForm onParcelCreated={fetchParcels} />
            </div>
          </div>

          <div className="parcel-list">
            <h4>All Parcels</h4>
            {parcels.length === 0 ? (
              <p>No parcels found.</p>
            ) : (
              <table className="parcel-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sender ID</th>
                    <th>Receiver ID</th>
                    <th>Pickup Location</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.parcel_id}>
                      <td>{parcel.parcel_id}</td>
                      <td>{parcel.sender_id}</td>
                      <td>{parcel.receiver_id}</td>
                      <td>{parcel.pickup_location}</td>
                      <td>{parcel.destination}</td>
                      <td>{parcel.status}</td>
                      <td>
                        <button
                          onClick={() => updateParcelStatus(parcel.parcel_id)}
                        >
                          Update Status
                        </button>
                        <button
                          onClick={() => updateParcelDetails(parcel.parcel_id)}
                        >
                          Update Details
                        </button>
                        <button
                          onClick={() => deleteParcel(parcel.parcel_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
