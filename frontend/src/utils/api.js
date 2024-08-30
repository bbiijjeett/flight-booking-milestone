import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost";

export const fetchFlights = async (source, destination, date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}:8081/api/v1/flights`, {
      params: { source, destination, date },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights", error);
    throw error;
  }
};

export const createBooking = async (bookingDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}:8082/api/v1/bookings`,
      bookingDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking", error);
    throw error;
  }
};

export const processPayment = async (paymentDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}:8083/api/v1/payments`,
      paymentDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error processing payment", error);
    throw error;
  }
};

export const fetchFlightDetailsById = async (flightId) => {
  const response = await axios.get(
    `${API_BASE_URL}:8081/api/v1/flights/${flightId}`
  );
  return response.data;
};
