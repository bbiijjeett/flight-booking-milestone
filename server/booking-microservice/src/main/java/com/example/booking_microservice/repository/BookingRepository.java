package com.example.booking_microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.booking_microservice.model.Booking;



public interface BookingRepository extends JpaRepository<Booking, Long> {
}