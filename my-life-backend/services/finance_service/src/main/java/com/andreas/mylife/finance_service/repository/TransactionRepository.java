package com.andreas.mylife.finance_service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andreas.mylife.finance_service.model.Transaction;

public interface TransactionRepository
    extends JpaRepository<Transaction, UUID> {
    
}
