/* eslint-disable no-unused-vars */
// src/components/FailedPaymentScreen.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const FailedPaymentScreen = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(-1); // Go back to the payment screen
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h2 className="text-3xl font-bold text-red-700 mb-4">Payment Failed</h2>
      <p>
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <Button variant="contained" color="primary" onClick={handleRetry}>
        Retry Payment
      </Button>
    </div>
  );
};

export default FailedPaymentScreen;
