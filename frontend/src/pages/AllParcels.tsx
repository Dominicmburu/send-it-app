import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import ParcelOverview from "../components/ParcelOverview";

interface Parcel {
  parcel_id: number;
  sender_id: number;
  receiver_id: number;
  pickup_location: string;
  destination: string;
  status: string;
}

const AllParcels: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [allParcels, setAllParcels] = useState<Parcel[]>([]);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("pending");

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/parcels",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (Array.isArray(response.data)) {
        setAllParcels(response.data);
      } else if (response.data && Array.isArray(response.data.parcels)) {
        setAllParcels(response.data.parcels);
      } else {
        setAllParcels([]);
      }
    } catch (err) {
      setError("Failed to fetch parcels");
    }
  };

  const updateParcelStatus = async (parcel_id: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/admin/parcel/status",
        { parcel_id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchParcels();
    } catch (err) {
      setError("Failed to update parcel status");
    }
  };

  const handleOpenStatusModal = (parcel_id: number) => {
    setSelectedParcelId(parcel_id);
    setNewStatus("pending");
    setStatusModalOpen(true);
  };

  const handleSubmitStatusUpdate = async () => {
    if (selectedParcelId !== null) {
      await updateParcelStatus(selectedParcelId, newStatus);
      setStatusModalOpen(false);
      setSelectedParcelId(null);
    }
  };

  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setSelectedParcelId(null);
  };

  const handleUpdateDetails = async (parcel_id: number) => {
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

  const handleDeleteParcel = async (parcel_id: number) => {
    if (!window.confirm("Are you sure you want to delete this parcel?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/admin/parcel/${parcel_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchParcels();
    } catch (err) {
      setError("Failed to delete parcel");
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="parcel-overview-wrapper">
          <Link to="/admin-dashboard" className="back-link">
            <IoIosArrowBack /> Back to dashboard
          </Link>
          {error && <p className="error-message">{error}</p>}
          <h4 style={{ paddingBlock: "2rem" }}>Recent parcels</h4>
          <div className="parcels-container">
            {allParcels.length > 0 ? (
              allParcels.map((parcel: Parcel) => (
                <ParcelOverview
                  key={parcel.parcel_id}
                  id={parcel.parcel_id}
                  sender={`Sender ID: ${parcel.sender_id}`}
                  receiver={`Receiver ID: ${parcel.receiver_id}`}
                  pickup_location={parcel.pickup_location}
                  destination={parcel.destination}
                  parcel_status={parcel.status}
                  onUpdateStatus={handleOpenStatusModal}
                  onUpdateDetails={handleUpdateDetails}
                  onDelete={handleDeleteParcel}
                />
              ))
            ) : (
              <p>No parcels found.</p>
            )}
          </div>
        </div>
      </div>

      {statusModalOpen && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div className="modal" style={modalStyle}>
            <h3>Update Parcel Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={handleSubmitStatusUpdate}
                style={{ marginRight: "0.5rem" }}
              >
                Submit
              </button>
              <button onClick={handleCloseStatusModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  width: "300px",
  textAlign: "center",
};

export default AllParcels;
