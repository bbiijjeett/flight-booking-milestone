import * as Yup from "yup";

// Validation schema for booking form
export const bookingValidationSchema = Yup.object().shape({
  source: Yup.string()
    .required("Source is required")
    .min(3, "Source must be at least 3 characters"),
  destination: Yup.string()
    .required("Destination is required")
    .min(3, "Destination must be at least 3 characters"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
});

// Validation schema for payment form
export const paymentValidationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^[0-9]{16}$/, "Card number must be exactly 16 digits"),
  expiryDate: Yup.date()
    .required("Expiry date is required")
    .min(new Date(), "Expiry date must be in the future"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number"),
});
