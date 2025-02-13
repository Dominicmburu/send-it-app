import React from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaClipboardCheck, FaMapMarkerAlt } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

const parcel_status = "Delivered";
const id = "KE432993";
const ParcelDetails: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
        <Link to="/admin-dashboard">BACK</Link>
          <div className="parcel-details">
          
            <h5>Parcel Details</h5>
            <div
              className="parcel-info"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div className="phone-address">
                <p>
                  Parcel ID: <strong className="pl">{id}</strong>
                </p>
                <div className="status">
                  {parcel_status == "Pending" ? (
                    <CiNoWaitingSign className="pending-icon" />
                  ) : (
                    <FaClipboardCheck className="delivered-icon" />
                  )}

                  <p>{parcel_status}</p>
                </div>
              </div>

              <div className="phone-address">
                <p>
                  Sender:
                  <strong className="pl">John Doe</strong>
                </p>
                <p>
                  Receiver:
                  <strong className="pl">Jane Doe</strong>
                </p>
              </div>
              <div className="phone-address">
                <p>
                  Pick-up Location:
                  <strong className="pl">Lagos</strong>
                </p>
                <p>
                  Destination:
                  <strong className="pl"> Abuja</strong>
                </p>
              </div>
            </div>
            <div
              className="actions"
            >
              <Link to="#" className="actions-update" >
                <MdUpdate /> Update Status
              </Link>
              <Link to="#" className="actions-delete">
                <MdDelete /> Delete
              </Link>
              <Link to="#" className="actions-map">
                <FaMapMarkerAlt /> Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParcelDetails;
