import React from "react";
import { CiNoWaitingSign } from "react-icons/ci";

interface ParcelOverviewProps {parcelId: string, sender: number, receiver: number, parcel_status: string}


const ParcelOverview: React.FC<ParcelOverviewProps> = ({ parcelId, sender, receiver, parcel_status }) => {
  return (
    <div className="parcel-overview" style={{display:"flex", flexDirection:'column',
     width:'100%', maxWidth:'600px',border:'1px solid blue', gap:'0.5rem', borderRadius:'0.25rem',
      backgroundColor:'var(--background-dark-grey)', marginBottom:'1rem', padding:'1rem'}}>
      <div className="phone-address">
        <p>Parcel ID: 334020934</p>
        <div className="status">
          <CiNoWaitingSign className="pending-icon" />
          <p>{parcel_status}</p>
        </div>
      </div>
      <div className="sender phone-address">
        <p>To: Richard Mark</p>
        <p>From: <strong>{sender}</strong></p>
      </div>
    </div>
  );
};
export default ParcelOverview;
