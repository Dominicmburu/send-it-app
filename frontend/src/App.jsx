import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./AdminPage";
import UserDashboard from "./UserPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import IndexPage from "./IndexPage";
import AllParcels from "./AllParcels";
import ParcelDetails from "./ParcelDetails";
import MapPage from "./MapPage";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "admin" && userRole !== "admin") {
    return <Navigate to="/login" />;
  }

  if (role === "user" && userRole !== "user") {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard/parcels" element={<AllParcels />} />
        <Route
          path="/admin-dashboard/parcels/:parcelId"
          element={<ParcelDetails />}
        />

        <Route path="/map"  element={<MapPage/>}/>

        {/* <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/admin-dashboard/parcels/:parcelId"
          element={
            <ProtectedRoute role="admin">
              <ParcelDetails />
            </ProtectedRoute>
          }/> */}

        {/* <Route
          path="/admin-dashboard/parcels"
          element={
            <ProtectedRoute role="admin">
              <AllParcels/>
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
