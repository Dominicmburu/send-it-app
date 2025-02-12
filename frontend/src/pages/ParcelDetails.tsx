import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
const ParcelDetails:React.FC = () =>{
    return(
        <>
        <div className="wrapper">
            <div className="container">
                <div className="parcel-details"
                 >
                    <h4>Parcel Details</h4>
                    <div className="parcel-info">
                        <p><strong>Parcel ID:</strong> 1</p>
                        <p><strong>Sender:</strong> John Doe</p>
                        <p><strong>Receiver:</strong> Jane Doe</p>
                        <p><strong>Location:</strong> Lagos</p>
                        <p><strong>Destination:</strong> Abuja</p>
                        <p><strong>Status:</strong> Pending</p>
                    </div>
                    <div className="actions">
                        <button className="btn btn-secondary"><MdUpdate /> Update Status</button>
                        <button className="btn"><MdDelete /> Delete Parcel</button>
                        <a href=""><FaMapMarkerAlt /> Map</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ParcelDetails;