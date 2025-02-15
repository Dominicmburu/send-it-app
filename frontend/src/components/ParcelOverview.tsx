import React from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ParcelOverviewProps {
  id: number;
  sender: string;
  receiver: string;
  pickup_location: string;
  destination: string;
  parcel_status: string;
  onUpdateStatus: (id: number) => void;
  onUpdateDetails: (id: number) => void;
  onDelete: (id: number) => void;
}

const ParcelOverview: React.FC<ParcelOverviewProps> = ({
  id,
  sender,
  receiver,
  pickup_location,
  destination,
  parcel_status,
  onUpdateStatus,
  onUpdateDetails,
  onDelete,
}) => {
  return (
    <div className="parcel-overview">
      <Link
        to={`/admin-dashboard/parcels/${id}`}
        style={{
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          textDecoration: "none",
        }}
      >
        <div className="parcel-details">
          <p>
            <strong>Parcel ID:</strong> {id}
          </p>
          <p>
            <strong>Pickup Location:</strong> {pickup_location}
          </p>
          <p>
            <strong>Destination:</strong> {destination}
          </p>
          <div className="status">
            {parcel_status === "Pending" ? (
              <CiNoWaitingSign className="pending-icon" />
            ) : (
              <FaClipboardCheck className="delivered-icon" />
            )}
            <span>{parcel_status}</span>
          </div>
          <p>
            <strong>Sender:</strong> {sender}
          </p>
          <p>
            <strong>Receiver:</strong> {receiver}
          </p>
        </div>
      </Link>
      <div className="parcel-actions">
        <button onClick={() => onUpdateStatus(id)}>Update Status</button>
        <button onClick={() => onUpdateDetails(id)}>Update Details</button>
        <button onClick={() => onDelete(id)}>Delete Parcel</button>
      </div>
    </div>
  );
};

export default ParcelOverview;
