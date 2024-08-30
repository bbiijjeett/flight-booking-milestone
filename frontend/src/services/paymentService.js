import { processPayment } from "../utils/api";

export const initiatePayment = async (paymentDetails) => {
  try {
    const response = await processPayment(paymentDetails);
    console.log("Payment successful:", response);
    return response;
  } catch (error) {
    console.error("Error during payment process:", error);
    throw error;
  }
};

export const preparePaymentData = (formValues) => {
  const paymentData = {
    bookingId: formValues.bookingId,
    amount: formValues.amount,
    cardNumber: formValues.cardNumber,
    expiryDate: formValues.expiryDate,
    cvv: formValues.cvv,
  };
  return paymentData;
};
