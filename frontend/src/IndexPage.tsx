import React from "react";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch, CiNoWaitingSign } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { FaClipboardCheck,FaMapMarkerAlt  } from "react-icons/fa";


const IndexPage: React.FC = () => {
  return (
    <div className="container">
      <div className="form-container">
        <div className="welcome-container">
          <img
            src="./src/images/senditlogo.png"
            alt=""
            className="welcome-logo"
          />
          <div className="welcome-text">
            <h1>Welcome</h1>
            <p>Send your parcel today</p>
            <Link to="/login" className="btn">
              Get Started NOW
            </Link>
          </div>
        </div>
      </div>

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
              <p>
                Welcome,<strong> JOHNSON</strong>
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
              <button>Logout</button>
            </div>
          </nav>
        </div>
      </div>

      {/* Orders grouped by senders and receivers */}

      <div style={{ marginBottom: "4rem" }}>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Create a parcel
        </button>
      </div>

      {/* <h4>Your parcels</h4> */}
      <div className="user-orders-container">
        <div className="sent-orders">
          <h6>Sent parcels</h6>
          <div className="sent-orders-wrapper">
            {/* <div className="sent-order-card">
              <p>Parcel ID : 234333</p>
              <div className="status">
                <p>Delivered</p>
              </div>
              <div className="sender">
                <p>From : John Doe</p>
                <p>To: Richard Mark</p>
              </div>
              <div className="status">
                <p>Status</p>
              </div>
              <div className="actions">
                <button>Update</button>
                <button>Vew map</button>
              </div>
            </div> */}

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
              <div className="actions phone-address">
                <button>Update</button>
                <button>Vew map</button>
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
                <button><FaMapMarkerAlt /> Vew map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
