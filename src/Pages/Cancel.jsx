import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Payment Cancelled ❌</h1>
      <p>Your payment process was cancelled.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Go to Home
      </Link>
    </div>
  );
};

export default Cancel;
