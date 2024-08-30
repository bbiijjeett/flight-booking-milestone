/* eslint-disable no-unused-vars */
// src/components/SuccessScreen.jsx

import React from "react";

const SuccessScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h2 className="text-3xl font-bold text-green-700 mb-4">
        Payment Successful!
      </h2>
      <p>
        Your booking has been confirmed and an e-ticket has been generated. You
        can download it from your email.
      </p>
    </div>
  );
};

export default SuccessScreen;
