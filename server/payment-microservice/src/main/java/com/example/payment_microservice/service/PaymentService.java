package com.example.payment_microservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.payment_microservice.model.Payment;
import com.example.payment_microservice.repository.PaymentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String TOPIC = "T2";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Payment processPayment(Payment payment) {
        payment.setStatus("Success"); // Simplified logic for demo purposes
        Payment savedPayment = paymentRepository.save(payment);

        // Send message to Kafka Topic T2
        Map<String, Object> message = new HashMap<>();
        message.put("bookingId", savedPayment.getBookingId());
        message.put("status", savedPayment.getStatus());

        try {
            // Convert Map to JSON String
            String messageString = objectMapper.writeValueAsString(message);
            kafkaTemplate.send(TOPIC, messageString);
        } catch (Exception e) {
            e.printStackTrace(); // Handle exception
        }

        return savedPayment;
    }

    @KafkaListener(topics = "T1", groupId = "group_id")
    public void consume(String message) {
        // Process payment from T1 topic
        try {
            Map<String, Object> messageMap = objectMapper.readValue(message, HashMap.class);
            System.out.println("Received message: " + messageMap);
            Long bookingId = (Long) messageMap.get("bookingId");
            String paymentMode = (String) messageMap.get("paymentMode");
            double amount = (double) messageMap.get("amount");

            // Process payment logic here...
            Payment payment = new Payment();
            payment.setBookingId(bookingId);
            payment.setAmount(amount);
            payment.setStatus("Success"); // or "Failed"

            paymentRepository.save(payment);
        } catch (Exception e) {
            e.printStackTrace(); // Handle exception
        }
    }
}