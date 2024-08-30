import { createBooking, fetchFlights } from "../utils/api";

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
  // Example: Transforming or validating data before API call
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
