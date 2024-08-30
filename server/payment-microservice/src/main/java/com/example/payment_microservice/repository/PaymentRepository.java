package com.example.payment_microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.payment_microservice.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
