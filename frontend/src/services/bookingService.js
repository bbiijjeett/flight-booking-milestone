import {
  createBooking,
  fetchFlights,
  fetchFlightDetailsById,
} from "../utils/api";

export const initiateBooking = async (bookingDetails) => {
  try {
    const response = await createBooking(bookingDetails);
    console.log("Booking successful:", response);
    return response;
  } catch (error) {
    console.error("Error during booking process:", error);
    throw error;
  }
};

export const processBookingData = (formValues) => {
  const processedData = {
    flightId: formValues.flightId,
    userId: formValues.userId,
    status: "initiated",
  };
  return processedData;
};

export const getAvailableFlights = async (source, destination, date) => {
  try {
    const flights = await fetchFlights(source, destination, date);
    console.log("Fetched flights:", flights);
    return flights;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

// New function to fetch flight details by ID
export const fetchFlightDetails = async (flightId) => {
  try {
    const response = await fetchFlightDetailsById(flightId);
    console.log("Fetched flight details:", response);
    return response;
  } catch (error) {
    console.error("Error fetching flight details:", error);
    throw error;
  }
};
