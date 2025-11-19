package com.andreas.mylife.financeservice.model;

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
@Table(name = "transactions", indexes = {
        @Index(name = "idx_transactions_user_date", columnList = "user_id, transaction_date"),
        @Index(name = "idx_transactions_category", columnList = "category_id")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    // Relasi ke Account (Many to One)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    // Relasi ke Category (Many to One)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TransactionType type;

    @Column(name = "transaction_date", nullable = false)
    private ZonedDateTime transactionDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Self-Referencing Relationship untuk Transfer Pair
    // Menggunakan OneToOne karena satu transaksi transfer pasti cuma punya 1
    // pasangan
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transfer_pair_id")
    private Transaction transferPair;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;
}