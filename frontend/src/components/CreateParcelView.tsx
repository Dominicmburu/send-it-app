import React, { useState } from "react";
import { Link } from "react-router-dom";

const handleCreateParcel = async () => {};

const CreateParcelForm: React.FC = () => {
  const [newParcel, setNewParcel] = useState({
    parcel_id: "",
    sender_id: "",
    receiver_id: "",
    pickup_location: "",
    destination: "",
    status: "pending",
  });

  return (
    <>
      <form
        action=""
        className="parcel-form"
      >
        <input
          type="text"
          placeholder="Parcel ID"
          onChange={(e) =>
            setNewParcel({ ...newParcel, parcel_id: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Sender ID"
          onChange={(e) =>
            setNewParcel({ ...newParcel, sender_id: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Receiver ID"
          onChange={(e) =>
            setNewParcel({
              ...newParcel,
              receiver_id: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Pickup Location"
          onChange={(e) =>
            setNewParcel({
              ...newParcel,
              pickup_location: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Destination"
          onChange={(e) =>
            setNewParcel({
              ...newParcel,
              destination: e.target.value,
            })
          }
        />
        <select
          onChange={(e) =>
            setNewParcel({ ...newParcel, status: e.target.value })
          }
        >
          <option value="pending">Pending</option>
          <option value="in transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div>
          <button onClick={handleCreateParcel} className="btn btn-primary">
            Create Parcel
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateParcelForm;
