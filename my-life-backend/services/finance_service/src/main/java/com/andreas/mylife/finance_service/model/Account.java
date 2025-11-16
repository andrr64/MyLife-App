package com.andreas.mylife.finance_service.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "accounts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId; // Disimpan sebagai ID saja (Loose coupling dengan User Service)

    @Column(nullable = false, length = 100)
    private String name; // -- ASSET, HUTANG, DLL

    @Column(nullable = false, length = 20)
    private String type; // Bisa dibuat Enum juga kalau mau strict (BANK, CASH, etc)

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal balance; // Inisialisasi 0 biar aman

    @Column(length = 3, columnDefinition = "CHAR(3)")
    private String currency;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;
}