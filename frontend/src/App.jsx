import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage"; 
import SignupPage from "./SignupPage"; 
import AdminPage from "./AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/admin-dashboard" element={<AdminPage/>} />
        <Route path="/user-dashboard" element={<h1>User Dashboard</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/:rest*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;