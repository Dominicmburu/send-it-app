import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaClipboardCheck } from "react-icons/fa";
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

const allowedLocations = [
  "nairobi",
  "nyeri",
  "kisumu",
  "kiambu",
  "narok",
  "nanyuki",
  "meru",
  "kakamega",
  "mombasa",
  "thika",
  "nakuru",
];

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
    couponCode: "",
  });

  // Add search and pagination states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPageSent, setCurrentPageSent] = useState<number>(1);
  const [currentPageReceived, setCurrentPageReceived] = useState<number>(1);
  const parcelsPerPage = 5;

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
      console.log("Creating parcel with:", newParcel);
      const response = await axios.post(
        "http://localhost:5000/api/parcels",
        { ...newParcel },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Redirect to Stripe Checkout") {
        window.location.href = response.data.checkoutUrl;
        return;
      } else if (
        response.data.message ===
        "Parcel delivery order created successfully after payment."
      ) {
        alert("Parcel created successfully!");
        fetchParcels();
        setShowModal(false);
      }
    } catch (err: any) {
      console.error(
        "Error creating parcel:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to create parcel");
    }
  };

  // Filter both sent and received parcels using the search query
  const filteredSentParcels = parcels.sentParcels.filter((parcel) =>
    Object.values(parcel).some(
      (value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredReceivedParcels = parcels.receivedParcels.filter((parcel) =>
    Object.values(parcel).some(
      (value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Paginate sent parcels
  const indexOfLastSent = currentPageSent * parcelsPerPage;
  const indexOfFirstSent = indexOfLastSent - parcelsPerPage;
  const currentSentParcels = filteredSentParcels.slice(
    indexOfFirstSent,
    indexOfLastSent
  );

  // Paginate received parcels
  const indexOfLastReceived = currentPageReceived * parcelsPerPage;
  const indexOfFirstReceived = indexOfLastReceived - parcelsPerPage;
  const currentReceivedParcels = filteredReceivedParcels.slice(
    indexOfFirstReceived,
    indexOfLastReceived
  );

  return (
    <>
      <div className="wrapper">
        <div className="navbar-wrapper">
          <Navbar />
        </div>

        <div className="container">
          {/* Global search input placed at the top */}
          <div
            style={{
              marginBottom: "2rem",
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search parcels..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Reset pagination when a new search is performed
                setCurrentPageSent(1);
                setCurrentPageReceived(1);
              }}
              className="search-input"
              style={{
                padding: "0.8rem 1rem",
                marginTop: "6rem",
                outline: "none",
                border: "1px solid whitesmoke",
                color: "whitesmoke",
              }}
            />
          </div>

          <div style={{display:'flex', justifyContent:'space-between', gap:'4rem'}}>
            {/* Create parcel button */}
            <div style={{ marginBottom: "4rem" }}>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Create a parcel
              </button>
            </div>

            {/* Pagination controls for sent parcels (placed at the top) */}
            <div className="pagination" style={{ marginBottom: "1rem" }}>
              {Array.from(
                {
                  length: Math.ceil(
                    filteredSentParcels.length / parcelsPerPage
                  ),
                },
                (_, i) => (
                  <button style={{padding:'0.5rem 0.8rem', borderRadius:'0.25rem',border:'0.125px solid black', outline:'none', cursor:'pointer'}}
                    key={i + 1}
                    onClick={() => setCurrentPageSent(i + 1)}
                    className={currentPageSent === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="user-orders-container">
            {/* Sent parcels section */}
            <div className="sent-orders">
              <h6>Sent parcels</h6>

              <div className="sent-orders-wrapper">
                {currentSentParcels.length > 0 ? (
                  currentSentParcels.map((parcel) => (
                    <div key={parcel.parcel_id} className="parcel-card">
                      <div className="phone-address">
                        <p>Parcel ID: <strong className="pl">{parcel.parcel_id}</strong></p>
                        <div className="status">
                          <CiNoWaitingSign className="pending-icon" />
                          <p className="pl">{parcel.status}</p>
                        </div>
                      </div>
                      <div className="sender phone-address">
                        <p>
                          To:{" "}
                          <strong className="pl">{users.find(
                            (user) => user.user_id === parcel.receiver_id
                          )?.username || "Unknown"}</strong>
                          
                        </p>
                      </div>
                      <div className="phone-address">
                        <p>Pickup: <strong className="pl">{parcel.pickup_location}</strong></p>
                        <p>Destination: <strong className="pl">{parcel.destination}</strong></p>
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

            {/* Received parcels section */}
            <div className="received-orders">
              <h6>Received parcels</h6>
              {/* Pagination controls for received parcels (placed at the top) */}
              <div className="pagination" style={{ marginBottom: "1rem" }}>
                {Array.from(
                  {
                    length: Math.ceil(
                      filteredReceivedParcels.length / parcelsPerPage
                    ),
                  },
                  (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPageReceived(i + 1)}
                      className={currentPageReceived === i + 1 ? "active" : ""}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
              <div className="sent-orders-wrapper">
                {currentReceivedParcels.length > 0 ? (
                  currentReceivedParcels.map((parcel) => (
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
                  value={newParcel.receiver_id}
                >
                  <option value="">Select Receiver</option>
                  {users.map((user) => (
                    <option key={user.user_id} value={user.user_id}>
                      {user.username} ({user.email})
                    </option>
                  ))}
                </select>

                <select
                  onChange={(e) =>
                    setNewParcel({
                      ...newParcel,
                      pickup_location: e.target.value,
                    })
                  }
                  value={newParcel.pickup_location}
                >
                  <option value="">Select Pickup Location</option>
                  {allowedLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  onChange={(e) =>
                    setNewParcel({
                      ...newParcel,
                      destination: e.target.value,
                    })
                  }
                  value={newParcel.destination}
                >
                  <option value="">Select Destination</option>
                  {allowedLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Coupon Code (optional)"
                  onChange={(e) =>
                    setNewParcel({
                      ...newParcel,
                      couponCode: e.target.value,
                    })
                  }
                  value={newParcel.couponCode}
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

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default UserPage;
