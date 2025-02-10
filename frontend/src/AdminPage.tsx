import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import { CiSearch,CiNoWaitingSign } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newParcel, setNewParcel] = useState({
    parcel_id: "",
    sender_id: "",
    receiver_id: "",
    pickup_location: "",
    destination: "",
    status: "pending",
  });
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

  const updateParcelStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/parcels/${id}/status`, { status });
      fetchParcels();
    } catch (err) {
      setError("Failed to update parcel status");
    }
  };

  const handleCreateParcel = async () => {
    try {
      await axios.post("/api/parcels", { ...newParcel, created_at: new Date(), updated_at: new Date() });
      fetchParcels();
      setShowModal(false);
    } catch (err) {
      setError("Failed to create parcel");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const allParcels = [{ id: 1, sender: "John Doe", receiver: "Jane Doe", status: "Pending" }

    ,{ id: 2, sender: "John Doe", receiver: "Jane Doe", status: "Pending" },{id:3, sender:"Johnson", receiver:'jane',status:'pending'}
  ];

  return (
    <>
    
    
      <div className="navbar-wrapper">
        <div className="navbar-container">
          {/* Navbar welcome message( Welcome Admin), search bar and logout button */}
          <nav className="navbar">
            <div className="admin-logo">
            <img src="./src/images/senditlogo.png" alt="" className="admin-logo-image" />
            <p>Welcome,<strong> Admin</strong></p>
            </div>
            <div className="search-input">
            <input type="text" placeholder="Search parcels" />
            <CiSearch  className="icon"/>
            </div>
            <div className="logout">
            <button onClick={handleLogout}>Logout</button></div>
          </nav>
        </div>
      </div>

<div className="wrapper">


  {/* Display parcels */}
  <div className="container">
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => setShowModal(true)} className="btn btn-primary"><IoMdCreate /> Create a parcel</button>


      <div className="parcels-wrapper">
        <h3>Parcels</h3>
        <div className="parcels">
            <div className="parcel-card">
                <div className="phone-address">
                  <p>Parcel ID</p>
                  <div className="status">
                    <FaClipboardCheck className="delivered-icon"/>
                    <p>Delivered</p>
                  </div>
                </div>
                <div className="sender phone-address">
                  <p>From : John Doe</p>
                  <p>To: Richard Mark</p>
                </div>
                <div className="status">
                  <CiNoWaitingSign className="pending-icon"/>
                  <p>Status</p>
                </div>
                <div className="actions">
                  <button>Update</button>
                  <button>Vew map</button>
                </div>
            </div>
            <div className="parcel-card">
                <div className="parcel-id">Parcel ID</div>
                <div className="sender">Sender</div>
                <div className="receiver">Receiver</div>
                <div className="status">Status</div>
                <div className="actions">Actions</div>
            </div>
            <div className="parcel-card">
                <div className="parcel-id">Parcel ID</div>
                <div className="sender">Sender</div>
                <div className="receiver">Receiver</div>
                <div className="status">Status</div>
                <div className="actions">Actions</div>
            </div>
            <div className="parcel-card">
                <div className="parcel-id">Parcel ID</div>
                <div className="sender">Sender</div>
                <div className="receiver">Receiver</div>
                <div className="status">Status</div>
                <div className="actions">Actions</div>
            </div>
        </div>
        
      </div>
        <table>
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allParcels.map((parcel) => (
              <tr key={parcel.id}>
                <td>{parcel.id}</td>
                <td>{parcel.sender}</td>
                <td>{parcel.receiver}</td>
                <td>{parcel.status}</td>
                <td>
                  <button onClick={() => updateParcelStatus(parcel.id, "delivered")}>
                    Mark as delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        

      
    





    <div className="admin-dashboard">
      <table className="parcel-table">
        <thead>
          <tr>
            <th>Parcel ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allParcels.map((parcel: any) => (
            <tr key={parcel.id}>
              <td>{parcel.id}</td>
              <td>{parcel.sender}</td>
              <td>{parcel.receiver}</td>
              <td>{parcel.status}</td>
              <td>
                <button onClick={() => updateParcelStatus(parcel.id, "Delivered")} className="update-status-button">
                  Mark as Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Parcel</h2>
            <input type="number" placeholder="Parcel ID" onChange={(e) => setNewParcel({ ...newParcel, parcel_id: e.target.value })} />
            <input type="number" placeholder="Sender ID" onChange={(e) => setNewParcel({ ...newParcel, sender_id: e.target.value })} />
            <input type="number" placeholder="Receiver ID" onChange={(e) => setNewParcel({ ...newParcel, receiver_id: e.target.value })} />
            <input type="text" placeholder="Pickup Location" onChange={(e) => setNewParcel({ ...newParcel, pickup_location: e.target.value })} />
            <input type="text" placeholder="Destination" onChange={(e) => setNewParcel({ ...newParcel, destination: e.target.value })} />
            <select onChange={(e) => setNewParcel({ ...newParcel, status: e.target.value })}>
              <option value="pending">Pending</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={handleCreateParcel} className="create-parcel-button">Create Parcel</button>
            <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
    </div>

</div>
    







    </>
  );
};

export default AdminDashboard;