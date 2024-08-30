/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAvailableFlights } from "../services/bookingService"; // Import the service function to fetch flights
import FlightIcon from "@mui/icons-material/Flight";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SearchResultScreen = () => {
  const [flights, setFlights] = useState([]); // State to store the fetched flights
  const [filter, setFilter] = useState({ aircraft: "", priceRange: "" }); // State to manage filters
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate between pages
  const query = new URLSearchParams(location.search); // Parse query parameters
  const source = query.get("source");
  const destination = query.get("destination");
  const date = query.get("date");

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        // Use the service function to fetch flights
        const results = await getAvailableFlights(source, destination, date);
        setFlights(results);
      } catch (error) {
        console.error("Error fetching flights", error);
      }
    };

    // Fetch flights only if all necessary parameters are provided
    if (source && destination && date) {
      fetchFlightData();
    }
  }, [source, destination, date]);

  // Filter flights based on the selected filters
  const filteredFlights = flights.filter((flight) => {
    return (
      (filter.aircraft === "" ||
        flight.aircraftName.includes(filter.aircraft)) &&
      (filter.priceRange === "" ||
        flight.price <= parseFloat(filter.priceRange))
    );
  });

  // Handle booking action
  const handleBookNow = (flightId) => {
    // Navigate to the booking screen with the flight ID as a query parameter
    navigate(`/booking?flightId=${flightId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar for Filters */}
      <aside className="w-full h-screen lg:w-1/4 p-4 bg-white lg:border-r lg:border-gray-300 lg:pr-4 flex flex-col gap-5">
        <h3 className="text-xl font-bold mb-4">Filters</h3>
        <FormControl fullWidth variant="outlined" className="mb-4">
          <InputLabel>Aircraft</InputLabel>
          <Select
            value={filter.aircraft}
            onChange={(e) => setFilter({ ...filter, aircraft: e.target.value })}
            label="Aircraft"
          >
            <MenuItem value="">All Aircraft</MenuItem>
            <MenuItem value="Airbus">Airbus</MenuItem>
            <MenuItem value="Boeing">Boeing</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Price Range</InputLabel>
          <Select
            value={filter.priceRange}
            onChange={(e) =>
              setFilter({ ...filter, priceRange: e.target.value })
            }
            label="Price Range"
          >
            <MenuItem value="">Any Price</MenuItem>
            <MenuItem value="100">Up to ₹5000</MenuItem>
            <MenuItem value="200">Up to ₹8000</MenuItem>
            <MenuItem value="300">Up to ₹10000</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {filteredFlights.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-2 px-4 text-left"></th>
                <th className="py-2 px-4 text-left">Aircraft</th>
                <th className="py-2 px-4 text-left">Flight Number</th>
                <th className="py-2 px-4 text-left">Source</th>
                <th className="py-2 px-4 text-left">Destination</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map((flight) => (
                <tr
                  key={flight.id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 text-center">
                    <FlightIcon />
                  </td>
                  <td className="py-2 px-4">{flight.aircraftName}</td>
                  <td className="py-2 px-4">{flight.flightNumber}</td>
                  <td className="py-2 px-4">{flight.source}</td>
                  <td className="py-2 px-4">{flight.destination}</td>
                  <td className="py-2 px-4">{flight.date}</td>
                  <td className="py-2 px-4">₹{flight.price.toFixed(2)}</td>
                  <td className="py-2 px-4 text-center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBookNow(flight.id)} // Call handleBookNow with flight ID
                    >
                      Book Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Flights Available</p>
        )}
      </main>
    </div>
  );
};

export default SearchResultScreen;
