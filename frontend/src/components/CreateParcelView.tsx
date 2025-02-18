import React, { useState } from "react";
import axios from "axios";

interface CreateParcelFormProps {
  onParcelCreated: () => void;
}

const CreateParcelForm: React.FC<CreateParcelFormProps> = ({
  onParcelCreated,
}) => {
  const [newParcel, setNewParcel] = useState({
    sender_id: "",
    receiver_id: "",
    pickup_location: "",
    destination: "",
    status: "pending",
  });
  const [error, setError] = useState("");

  const handleCreateParcel = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/admin/parcel",
        {
          sender_id: parseInt(newParcel.sender_id),
          receiver_id: parseInt(newParcel.receiver_id),
          pickup_location: newParcel.pickup_location,
          destination: newParcel.destination,
          status: newParcel.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onParcelCreated();
    } catch (err) {
      setError("Failed to create parcel");
    }
  };

  return (
    <form className="parcel-form" onSubmit={handleCreateParcel}>
      <input
        data-cy="parcel-id"
        type="number"
        placeholder="Sender ID"
        value={newParcel.sender_id}
        onChange={(e) =>
          setNewParcel({ ...newParcel, sender_id: e.target.value })
        }
      />
      <input
        data-cy="receiver"
        type="number"
        placeholder="Receiver ID"
        value={newParcel.receiver_id}
        onChange={(e) =>
          setNewParcel({ ...newParcel, receiver_id: e.target.value })
        }
      />
      <input
      data-cy="pick-up-location"
        type="text"
        placeholder="Pickup Location"
        value={newParcel.pickup_location}
        onChange={(e) =>
          setNewParcel({ ...newParcel, pickup_location: e.target.value })
        }
      />
      <input
      data-cy='destination'
        type="text"
        placeholder="Destination"
        value={newParcel.destination}
        onChange={(e) =>
          setNewParcel({ ...newParcel, destination: e.target.value })
        }
      />
      <select
      data-cy="status"
        value={newParcel.status}
        onChange={(e) => setNewParcel({ ...newParcel, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="in transit">In Transit</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary" data-cy="create-parcel-btn">
        Create Parcel
      </button>
    </form>
  );
};

export default CreateParcelForm;
