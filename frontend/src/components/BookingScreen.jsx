/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  initiateBooking,
  processBookingData,
} from "../services/bookingService";
import { TextField, Button } from "@mui/material";

const BookingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const flightId = query.get("flightId");

  const [userDetails, setUserDetails] = useState({
    userId: "", // Fetch this from authentication or input manually
    name: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleBooking = async () => {
    try {
      const bookingData = processBookingData({ ...userDetails, flightId });
      const bookingResponse = await initiateBooking(bookingData);
      console.log("Booking successful:", bookingResponse);

      // Redirect to payment page with the booking ID
      navigate(`/payment?bookingId=${bookingResponse.id}`);
    } catch (error) {
      console.error("Error during booking process:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
      <form
        className="w-full max-w-md bg-white p-8 shadow-md rounded"
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          variant="outlined"
          value={userDetails.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          variant="outlined"
          value={userDetails.email}
          onChange={handleChange}
          required
        />
        {/* Add more fields as necessary */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleBooking}
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  );
};

export default BookingScreen;
