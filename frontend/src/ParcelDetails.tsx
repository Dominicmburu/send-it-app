import React from "react";
const ParcelDetails:React.FC = () =>{
    return(
        <>
        <div className="wrapper">
            <div className="container">
                <div className="parcel-details">
                    <h2>Parcel Details</h2>
                    <div className="parcel-info">
                        <p><strong>Parcel ID:</strong> 1</p>
                        <p><strong>Sender:</strong> John Doe</p>
                        <p><strong>Receiver:</strong> Jane Doe</p>
                        <p><strong>Location:</strong> Lagos</p>
                        <p><strong>Destination:</strong> Abuja</p>
                        <p><strong>Status:</strong> Pending</p>
                    </div>
                    <div className="actions">
                        <button className="btn">Update Status</button>
                        <button className="btn">Delete Parcel</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ParcelDetails;