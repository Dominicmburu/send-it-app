import React from "react";
import { Link } from "react-router-dom";


const AdminPage: React.FC = () => {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/admin/users"
          className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
        >
          Manage Users
        </Link>
        <Link
          to="/admin/parcels"
          className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
        >
          Manage Parcels
        </Link>
    </div>
    </div>
  );
};

export default AdminPage;