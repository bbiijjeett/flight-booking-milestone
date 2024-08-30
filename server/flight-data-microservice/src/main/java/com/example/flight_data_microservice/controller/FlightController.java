package com.example.flight_data_microservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.flight_data_microservice.model.Flight;
import com.example.flight_data_microservice.service.FlightService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<Flight> getAllFlights(@RequestParam String source, @RequestParam String destination, @RequestParam String date) {
        return flightService.findFlights(source, destination, date);
    }
}
