/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import SearchResultScreen from "./components/SearchResultScreen";
import BookingScreen from "./components/BookingScreen";
import PaymentScreen from "./components/PaymentScreen";
import SuccessScreen from "./components/SuccessScreen";
import FailedPaymentScreen from "./components/FailedPaymentScreen";
import { Link } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";

function App() {
  return (
    <Router>
      <nav className="bg-blue-500 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-white text-2xl font-bold"
          >
            <FlightIcon className="mr-2" />
            Flight Booking
          </Link>
          {/* Add additional navigation items here if needed */}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/results" element={<SearchResultScreen />} />
        <Route path="/booking" element={<BookingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/failed" element={<FailedPaymentScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
