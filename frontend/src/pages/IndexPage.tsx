import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { CiSearch, CiNoWaitingSign } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { FaClipboardCheck, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

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
    </div>
  );
};

export default IndexPage;
