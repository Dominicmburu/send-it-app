import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/SuccessPage.css";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const getQueryParam = (param: string): string | null => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId = getQueryParam("session_id");
      if (!sessionId) {
        setMessage("Session ID is missing.");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:5000/api/parcels/confirm",
          { sessionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Payment confirmed and parcel saved!");
        setPaymentConfirmed(true);
      } catch (error: any) {
        console.error("Error confirming payment:", error.response?.data || error.message);
        setMessage("Failed to confirm payment. Please try again later.");
        setPaymentConfirmed(false);
      }
    };

    confirmPayment();
  }, [location, navigate]);

  const handleGoHome = () => {
    navigate("/user-dashboard");
  };

  return (
    <div className="success-page">
      <div className="animation-container">
        {paymentConfirmed ? (
          <div className="checkmark-container">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        ) : (
          <div className="error-animation">
          </div>
        )}
      </div>
      <h3>{message}</h3>
      <p>Please click the button below to return to the homepage.</p>
      <button onClick={handleGoHome} className="go-home-button">
        Go to Homepage
      </button>
    </div>
  );
};

export default SuccessPage;
