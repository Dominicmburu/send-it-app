import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch, CiNoWaitingSign } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { FaClipboardCheck, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const UserPage: React.FC = () => {
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
  const fetchParcels = async () => {
    try {
      const response = await axios.get("/api/parcels");
      setParcels(response.data);
    } catch (err) {
      setError("Failed to fetch parcels");
    }
  };

  const handleCreateParcel = async () => {
    try {
      await axios.post("/api/parcels", {
        ...newParcel,
        created_at: new Date(),
        updated_at: new Date(),
      });
      fetchParcels();
      setShowModal(false);
    } catch (err) {
      setError("Failed to create parcel");
    }
  };

  return (
    <>
      <div className="wrapper">
        {/* User dashboard */}

        <div className="navbar-wrapper">
          <div className="navbar-container">
            {/* Navbar welcome message( Welcome JOHNSON), notification and logout button */}
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
                  Welcome,<br /><strong> JOHNSON</strong>
                </p>
                <div className="notification">
                  <IoIosNotifications className="theme" />
                </div>
                <button>Logout</button>
              </div>
            </nav>
          </div>
        </div>

        {/* <h4>Your parcels</h4> */}
        <div className="container">
          {/* Orders grouped by senders and receivers */}

          <div style={{ marginBottom: "4rem" }}>
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
                <div className="parcel-card">
                  <div className="phone-address">
                    <p>Parcel ID: 334020934</p>
                    <div className="status">
                      <CiNoWaitingSign className="pending-icon" />
                      <p>Pending</p>
                    </div>
                  </div>
                  <div className="sender phone-address">
                    <p>To: Richard Mark</p>
                  </div>
                  <div className="phone-address">
                    <p>Pick up : Nairobi </p>
                    <p>Destination: Nakuru</p>
                  </div>
                  <div className="actions" style={{}}>
                    <button>Update</button>
                    <Link to='/map'>View map</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="received-orders">
              <h6>Received parcels</h6>
              <div className="sent-orders-wrapper">
                <div className="parcel-card">
                  <div className="phone-address">
                    <p>Parcel ID: 334020934</p>
                    <div className="status">
                      <FaClipboardCheck className="delivered-icon" />
                      <p>Delivered</p>
                    </div>
                  </div>
                  <div className="sender phone-address">
                    <p>From: Dianna Pickford</p>
                  </div>
                  <div className="phone-address">
                    <p>Pick up : Nairobi </p>
                    <p>Destination: Nakuru</p>
                  </div>
                  <div className="actions phone-address">
                    <button>Update</button>
                    <button>
                      <FaMapMarkerAlt /> Vew map
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Create Parcel</h2>
                  <input
                    type="number"
                    placeholder="Parcel ID"
                    onChange={(e) =>
                      setNewParcel({ ...newParcel, parcel_id: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Sender ID"
                    onChange={(e) =>
                      setNewParcel({ ...newParcel, sender_id: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Receiver ID"
                    onChange={(e) =>
                      setNewParcel({
                        ...newParcel,
                        receiver_id: e.target.value,
                      })
                    }
                  />
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
                      setNewParcel({
                        ...newParcel,
                        destination: e.target.value,
                      })
                    }
                  />
                  <select
                    onChange={(e) =>
                      setNewParcel({ ...newParcel, status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
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
      </div>
    </>
  );
};

export default UserPage;
