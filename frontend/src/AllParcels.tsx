import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const AllParcels:React.FC = () => {
    const [error,setError]= useState('')
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

  return (
    <>
      {/* Display parcels */}
      <div className="container">


<Link to="/admin-dashboard" className="back-link"><IoIosArrowBack /> Back to Dashboard</Link>
        {error && <p className="error-message">{error}</p>}

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
        </div>
      </div>
    </>
  );
};

export default AllParcels;
