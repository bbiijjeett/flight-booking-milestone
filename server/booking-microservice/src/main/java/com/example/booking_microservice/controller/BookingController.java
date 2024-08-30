package com.example.booking_microservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.booking_microservice.model.Booking;
import com.example.booking_microservice.service.BookingService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Endpoint to search flights
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/search")
    public List<Object> searchFlights(@RequestParam String source, @RequestParam String destination, @RequestParam String date) {
        return bookingService.searchFlights(source, destination, date);
    }

    // Endpoint to create a new booking
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    // Endpoint to initiate payment for a booking
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/{id}/payment")
    public Map<String, String> initiatePayment(@PathVariable Long id, @RequestBody Map<String, Object> paymentDetails) {
        return bookingService.initiatePayment(id, paymentDetails);
    }

    // Endpoint to update booking status
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/{id}")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        return bookingService.updateBookingStatus(id, status);
    }
}