package com.example.booking_microservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.booking_microservice.model.Booking;
import com.example.booking_microservice.repository.BookingRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private KafkaTemplate<String, Map<String, Object>> kafkaTemplate;

    private static final String TOPIC_T1 = "T1";
    private static final String FLIGHT_DATA_MS_URL = "http://localhost:8081/api/v1/flights";
    private static final String PAYMENT_MS_URL = "http://localhost:8083/api/v1/payments";

    // Search flights by calling Flight Data MS
    public List<Object> searchFlights(String source, String destination, String date) {
        String url = FLIGHT_DATA_MS_URL + "?source=" + source + "&destination=" + destination + "&date=" + date;
        return restTemplate.getForObject(url, List.class);
    }

    // Create a new booking
    public Booking createBooking(Booking booking) {
        booking.setStatus("initiated");
        return bookingRepository.save(booking);
    }

    // Initiate payment for a booking by calling Payment MS
    public Map<String, String> initiatePayment(Long bookingId, Map<String, Object> paymentDetails) {
        // Retrieve booking details
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Set payment details and invoke Payment MS
        paymentDetails.put("bookingId", bookingId);
        Map<String, String> paymentResponse = restTemplate.postForObject(PAYMENT_MS_URL, paymentDetails, Map.class);

        // Update booking status based on payment response
        String paymentStatus = paymentResponse.get("status");
        booking.setStatus(paymentStatus.equals("Success") ? "successful" : "failed");
        bookingRepository.save(booking);

        // Produce payment status message to Kafka Topic T1
        kafkaTemplate.send(TOPIC_T1, paymentDetails);

        return paymentResponse;
    }

    // Update booking status
    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
}