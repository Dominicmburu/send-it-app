import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";

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
    if (!token || token !== "admin-token") {
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
    navigate("/login");
  };

  const allParcels = [{ id: 1, sender: "John Doe", receiver: "Jane Doe", status: "Pending" }

    ,{ id: 2, sender: "John Doe", receiver: "Jane Doe", status: "Pending" },{id:3, sender:"Johnson", receiver:'jane',status:'pending'}
  ];

  return (
    <div className="admin-dashboard">
      <h2 className="title">Admin Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <button onClick={() => setShowModal(true)} className="send-parcel-button">Send Parcel</button>
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
  );
};

export default AdminDashboard;