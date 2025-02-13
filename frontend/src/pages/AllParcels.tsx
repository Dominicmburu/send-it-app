import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import ParcelOverview from "../components/ParcelOverview";

const AllParcels: React.FC = () => {
  const [error, setError] = useState("");
  const [allParcels, setAllParcels] = useState([]);

  // fetch all parcels
  const fetchParcels = async () => {
    try {
      const response = await axios.get("/api/parcels");
      setAllParcels(response.data);
    } catch (err) {
      setError("Failed to fetch parcels");
    }
  };

  //Update parcel status
  const updateParcelStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/parcels/${id}/status`, { status });
      fetchParcels();
    } catch (err) {
      setError("Failed to update parcel status");
    }
  };

  interface parcelProp {
    id: number;
    sender: string;
    receiver: string;
    parcel_status: string;
  }

  const parcels = [
    {
      id: 1,
      sender: "John Doe",
      receiver: "Jane Doe",
      parcel_status: "Pending",
    },

    {
      id: 2,
      sender: "John Doe",
      receiver: "Jane Doe",
      parcel_status: "Delivered",
    },
    { id: 3, sender: "Johnson", receiver: "jane", parcel_status: "Pending" },
  ];

  return (
    <div className="wrapper">
      {/* Display parcels */}
      <div className="container">
        <div className="parcel-overview-wrapper">
          <Link to="/admin-dashboard" className="back-link">
            <IoIosArrowBack /> Back to dashboard
          </Link>
          {error && <p className="error-message">{error}</p>}
          <h4 style={{paddingBlock:'2rem'}}>Recent parcels</h4>
          <div className="parcels-container">
            {/* Loop through all parcels */}
            {parcels.map((parcel: parcelProp) => (
              <ParcelOverview key={parcel.id} {...parcel} />
            ))}
          </div>

          {/* <div className="admin-dashboard">
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
              {parcels.map((parcel: any) => (
                <tr key={parcel.id}>
                  <td>{parcel.id}</td>
                  <td>{parcel.sender}</td>
                  <td>{parcel.receiver}</td>
                  <td>{parcel.status}</td>
                  <td>
                    <button
                      onClick={() => updateParcelStatus(parcel.id, "Delivered")}
                      className="update-status-button"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default AllParcels;
