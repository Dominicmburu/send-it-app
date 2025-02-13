import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
<<<<<<< HEAD
import AdminDashboard from "./pages/AdminPage";
import UserDashboard from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import IndexPage from "./pages/IndexPage";
import AllParcels from "./pages/AllParcels";
import ParcelDetails from "./pages/ParcelDetails";
import MapPage from "./pages/MapPage";
=======
import AdminDashboard from "./AdminPage";
import UserDashboard from "./UserPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import IndexPage from "./IndexPage";
import AllParcels from "./AllParcels";
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2

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
<<<<<<< HEAD
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
=======
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin-dashboard/"
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
<<<<<<< HEAD
        /> */}
        {/* <Route
          path="/admin-dashboard/parcels/:parcelId"
          element={
            <ProtectedRoute role="admin">
              <ParcelDetails />
            </ProtectedRoute>
          }/> */}

        {/* <Route
=======
        />
        <Route
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
          path="/admin-dashboard/parcels"
          element={
            <ProtectedRoute role="admin">
              <AllParcels/>
            </ProtectedRoute>
          }
<<<<<<< HEAD
        /> */}
        {/* <Route
=======
        />
        <Route
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
<<<<<<< HEAD
        /> */}
=======
        />
        <Route path="/" element={<IndexPage />} />
        <Route path="/signup" element={<SignupPage />} />
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
      </Routes>
    </Router>
  );
};

export default App;
