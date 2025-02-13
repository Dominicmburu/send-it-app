import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaClipboardCheck, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/navbar";

interface User {
  user_id: number;
  username: string;
  email: string;
}

interface Parcel {
  parcel_id: number;
  receiver_id: number;
  sender_id: number;
  pickup_location: string;
  destination: string;
  status: string;
}

const UserPage: React.FC = () => {
  const [parcels, setParcels] = useState<{
    sentParcels: Parcel[];
    receivedParcels: Parcel[];
  }>({
    sentParcels: [],
    receivedParcels: [],
  });
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newParcel, setNewParcel] = useState({
    receiver_id: "",
    pickup_location: "",
    destination: "",
  });

  useEffect(() => {
    fetchParcels();
    fetchUsers();
  }, []);

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/parcels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(response.data);
    } catch (err) {
      setError("Failed to fetch parcels");
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        console.error("Unexpected response format:", response.data);
        setUsers([]);
      }
    } catch (err) {
      setError("Failed to fetch users");
      setUsers([]);
    }
  };

  const handleCreateParcel = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/parcels",
        { ...newParcel },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchParcels();
      setShowModal(false);
    } catch (err) {
      setError("Failed to create parcel");
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="navbar-wrapper">
          <Navbar />
        </div>

        <div className="container">
          <div style={{ marginBottom: "4rem", marginTop: "4rem" }}>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Create a parcel
            </button>
          </div>

          <div className="user-orders-container">
            <div className="sent-orders">
              <h6>Sent parcels</h6>
              <div className="sent-orders-wrapper">
                {parcels.sentParcels.length > 0 ? (
                  parcels.sentParcels.map((parcel) => (
                    <div key={parcel.parcel_id} className="parcel-card">
                      <div className="phone-address">
                        <p>Parcel ID: {parcel.parcel_id}</p>
                        <div className="status">
                          <CiNoWaitingSign className="pending-icon" />
                          <p>{parcel.status}</p>
                        </div>
                      </div>
                      <div className="sender phone-address">
                        <p>
                          To:{" "}
                          {users.find(
                            (user) => user.user_id === parcel.receiver_id
                          )?.username || "Unknown"}
                        </p>
                      </div>
                      <div className="phone-address">
                        <p>Pickup: {parcel.pickup_location}</p>
                        <p>Destination: {parcel.destination}</p>
                      </div>
                      <div className="actions">
                        <Link
                          to={`/map?pickup=${encodeURIComponent(
                            parcel.pickup_location
                          )}&destination=${encodeURIComponent(
                            parcel.destination
                          )}`}
                        >
                          View Map
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No sent parcels</p>
                )}
              </div>
            </div>

            <div className="received-orders">
              <h6>Received parcels</h6>
              <div className="sent-orders-wrapper">
                {Array.isArray(parcels.receivedParcels) &&
                parcels.receivedParcels.length > 0 ? (
                  parcels.receivedParcels.map((parcel) => (
                    <div key={parcel.parcel_id} className="parcel-card">
                      <div className="phone-address">
                        <p>Parcel ID: {parcel.parcel_id}</p>
                        <div className="status">
                          <FaClipboardCheck className="delivered-icon" />
                          <p>{parcel.status}</p>
                        </div>
                      </div>
                      <div className="sender phone-address">
                        <p>
                          From:{" "}
                          {users.find(
                            (user) => user.user_id === parcel.sender_id
                          )?.username || "Unknown"}
                        </p>
                      </div>
                      <div className="phone-address">
                        <p>Pickup: {parcel.pickup_location}</p>
                        <p>Destination: {parcel.destination}</p>
                      </div>
                      <div className="actions phone-address">
                        <Link
                          to={`/map?pickup=${encodeURIComponent(
                            parcel.pickup_location
                          )}&destination=${encodeURIComponent(
                            parcel.destination
                          )}`}
                        >
                          View Map
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No received parcels</p>
                )}
              </div>
            </div>
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h4>Create Parcel</h4>
                <select
                  onChange={(e) =>
                    setNewParcel({
                      ...newParcel,
                      receiver_id: e.target.value,
                    })
                  }
                >
                  <option value="">Select Receiver</option>
                  {users.map((user) => (
                    <option key={user.user_id} value={user.user_id}>
                      {user.username} ({user.email})
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Pickup Location"
                  onChange={(e) =>
                    setNewParcel({
                      ...newParcel,
                      pickup_location: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Destination"
                  onChange={(e) =>
                    setNewParcel({ ...newParcel, destination: e.target.value })
                  }
                />
                <button
                  onClick={handleCreateParcel}
                  className="create-parcel-button"
                >
                  Create Parcel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
