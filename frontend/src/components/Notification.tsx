import React from "react";

const Notification: React.FC = () => {
  return (
    <div
      className="notification"
      style={{
        position: "absolute",
        top: "5rem",
        right: "4rem",
        padding: "1rem",
        backgroundColor: "white",
        width: "200px",
        borderRadius: "0.125rem",
        height: "auto",
        zIndex: "10",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--primary-color)",
          color: "whitesmoke",
          height: "1.5rem",
          width: "1.5rem",
          borderRadius: "50%",
          display: "grid",
          placeContent: "center",
        }}
      >
        x
      </div>
      <p>You have a new message</p>
    </div>
  );
};

export default Notification;
