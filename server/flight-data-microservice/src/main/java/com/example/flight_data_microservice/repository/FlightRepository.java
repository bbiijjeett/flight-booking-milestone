package com.example.flight_data_microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.flight_data_microservice.model.Flight;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findBySourceAndDestinationAndDate(String source, String destination, String date);
}