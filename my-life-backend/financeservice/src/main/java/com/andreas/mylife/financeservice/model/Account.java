package com.andreas.mylife.financeservice.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp; // Tambahan Enterprise
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant; // GANTI INI
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
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AccountType type;

    @Column(nullable = false, precision = 19, scale = 4)
    @ColumnDefault("0")
    private BigDecimal balance;

    @Column(length = 3, columnDefinition = "CHAR(3)")
    @ColumnDefault("'IDR'")
    private String currency;

    @Column(name = "is_active", nullable = false)
    @ColumnDefault("true")
    private Boolean isActive;

    // --- AUDIT FIELDS ---

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt; // Ubah ke Instant

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt; // Tambahan untuk tracking perubahan

    // ... helper methods tetap sama
    public boolean isLiability() {
        return this.type.getCategory() == AccountType.AccountCategory.LIABILITY;
    }

    public BigDecimal getNetWorthValue() {
        if (isLiability()) {
            return this.balance.negate();
        }
        return this.balance;
    }
}