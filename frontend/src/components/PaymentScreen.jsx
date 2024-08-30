/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  initiatePayment,
  preparePaymentData,
} from "../services/paymentService";
import { TextField, Button } from "@mui/material";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const bookingId = query.get("bookingId");

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: 100, // Example amount; ideally, fetch from booking details
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePayment = async () => {
    try {
      const paymentData = preparePaymentData({ ...paymentDetails, bookingId });
      const paymentResponse = await initiatePayment(paymentData);
      console.log("Payment successful:", paymentResponse);

      if (paymentResponse.status === "Success") {
        navigate("/success");
      } else {
        navigate("/failed");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Enter Payment Details</h2>
      <form
        className="w-full max-w-md bg-white p-8 shadow-md rounded"
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          fullWidth
          margin="normal"
          name="cardNumber"
          label="Card Number"
          variant="outlined"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="expiryDate"
          label="Expiry Date (MM/YY)"
          variant="outlined"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="cvv"
          label="CVV"
          variant="outlined"
          value={paymentDetails.cvv}
          onChange={handleChange}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PaymentScreen;
