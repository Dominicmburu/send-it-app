import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage"; 
import SignupPage from "./SignupPage"; 
import AdminPage from "./AdminPage";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };


const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "admin" && userRole !== "admin") {
    return <Navigate to="/user-dashboard" />;
  }

  if (role === "user" && userRole !== "user") {
    return <Navigate to="/admin-dashboard" />;
  }

  return children;
};





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute role='admin'><AdminPage/></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute role='user'><h1>User Dashboard</h1></ProtectedRoute>} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/:rest*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;