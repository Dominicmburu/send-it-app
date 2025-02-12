import React from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ParcelOverviewProps {
  id: number;
  sender: string;
  receiver: string;
  parcel_status: string;
}

const ParcelOverview: React.FC<ParcelOverviewProps> = ({
  id,
  sender,
  receiver,
  parcel_status,
}) => {
  return (
    <div
      className="parcel-overview"

    >
      <Link to={`/admin-dashboard/parcels/${id}`} style={{color:'inherit'}}>
        <div className="phone-address">
          <p>Parcel ID: {id}</p>
          <div className="status">
            {parcel_status == "Pending" ? (
              <CiNoWaitingSign className="pending-icon" />
            ) : (
              <FaClipboardCheck className="delivered-icon" />
            )}

            <p>{parcel_status}</p>
          </div>
        </div>
        <div className="sender phone-address">
          <p>
            To: <strong>{receiver}</strong>
          </p>
          <p>
            From: <strong>{sender}</strong>
          </p>
        </div>
      </Link>
    </div>
  );
};
export default ParcelOverview;
