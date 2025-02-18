import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import ParcelOverview from "../components/ParcelOverview";

interface Parcel {
  parcel_id: number;
  sender_id: number;
  receiver_id: number;
  pickup_location: string;
  destination: string;
  status: string;
}

const AllParcels: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [allParcels, setAllParcels] = useState<Parcel[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<Parcel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("pending");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const parcelsPerPage = 5;

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/parcels", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      let parcelsArray: Parcel[] = [];
      if (Array.isArray(response.data)) {
        parcelsArray = response.data;
      } else if (response.data && Array.isArray(response.data.parcels)) {
        parcelsArray = response.data.parcels;
      }
  
      setAllParcels(parcelsArray);
      setFilteredParcels(parcelsArray);
    } catch (err) {
      setError("Failed to fetch parcels");
    }
  };
  

  useEffect(() => {
    fetchParcels();
  }, []);

  useEffect(() => {
    // const filtered = allParcels.filter((parcel) =>
    //   Object.values(parcel).some((value) =>
    //     value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    //   )
    // );


    const filtered = allParcels.filter((parcel) =>
      Object.values(parcel).some((value) =>
        value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    


    setFilteredParcels(filtered);
  }, [searchQuery, allParcels]);

  const handleOpenStatusModal = (parcel_id: number) => {
    setSelectedParcelId(parcel_id);
    setNewStatus("pending");
    setStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setSelectedParcelId(null);
  };

  const indexOfLastParcel = currentPage * parcelsPerPage;
  const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
  const currentParcels = filteredParcels.slice(indexOfFirstParcel, indexOfLastParcel);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="parcel-overview-wrapper">
          <Link to="/admin-dashboard" className="back-link">
            <IoIosArrowBack /> Back to dashboard
          </Link>
          {error && <p className="error-message">{error}</p>}
          <h4 style={{ paddingBlock: "2rem" }}>Recent parcels</h4>
          
          <input
            type="text"
            placeholder="Search parcels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{padding:'0.8rem 1rem', outline:'none', border:'1px solid whitesmoke', color:'whitesmoke'}}
          />
          
          {/* Display parcels  */}
          <div className="parcels-container" style={{marginTop:'2rem'}}>
            {currentParcels.length > 0 ? (
              currentParcels.map((parcel: Parcel) => (
                <ParcelOverview
                  key={parcel.parcel_id}
                  id={parcel.parcel_id}
                  sender={`Sender ID: ${parcel.sender_id}`}
                  receiver={`Receiver ID: ${parcel.receiver_id}`}
                  pickup_location={parcel.pickup_location}
                  destination={parcel.destination}
                  parcel_status={parcel.status}
                  onUpdateStatus={handleOpenStatusModal} onUpdateDetails={function (id: number): void {
                    throw new Error("Function not implemented.");
                  } } onDelete={function (id: number): void {
                    throw new Error("Function not implemented.");
                  } }                />
              ))
            ) : (
              <p>No parcels found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredParcels.length / parcelsPerPage) }, (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {statusModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Parcel Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={() => setStatusModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcels;
