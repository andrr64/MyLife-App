package com.andreas.mylife.finance_service.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.ColumnDefault;

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
    private UUID userId;

    @Column(nullable = false, length = 100)
    private String name; // Contoh: "BCA Utama", "Shopee PayLater", "Dompet Fisik"

    // --- STRICT TYPING ---
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AccountType type;
    // Database akan nyimpen: 'BANK', 'PAYLATER', 'CASH', dll.

    // Kita simpan saldonya.
    // Logic Bisnis:
    // Jika tipe ASSET (Bank), balance 1jt = Punya uang 1jt.
    // Jika tipe LIABILITY (Paylater), balance 1jt = Punya utang 1jt.
    @Column(nullable = false, precision = 19, scale = 4)
    @ColumnDefault("0")
    private BigDecimal balance ;

    @Column(length = 3, columnDefinition = "CHAR(3)")
    @ColumnDefault("'IDR'")
    private String currency;

    @Column(name = "is_active", nullable = false)
    @ColumnDefault("true")
    private Boolean isActive; // Fitur soft delete/arsip akun (misal kartu kredit ditutup)

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    // --- HELPER METHODS (Optional tapi Berguna) ---

    // Method ini berguna buat UI atau logic hitung Net Worth
    public boolean isLiability() {
        return this.type.getCategory() == AccountType.AccountCategory.LIABILITY;
    }

    // Mendapatkan nilai "Real" untuk perhitungan kekayaan
    // Kalau Paylater isinya 500rb, berarti kekayaan -500rb
    public BigDecimal getNetWorthValue() {
        if (isLiability()) {
            return this.balance.negate();
        }
        return this.balance;
    }
}