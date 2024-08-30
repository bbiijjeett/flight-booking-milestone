package com.example.flight_data_microservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.flight_data_microservice.model.Flight;
import com.example.flight_data_microservice.repository.FlightRepository;

import java.util.List;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> findFlights(String source, String destination, String date) {
        return flightRepository.findBySourceAndDestinationAndDate(source, destination, date);
    }
}
