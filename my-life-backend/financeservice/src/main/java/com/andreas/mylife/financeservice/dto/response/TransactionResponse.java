package com.andreas.mylife.financeservice.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // Best Practice: Hemat bandwidth
public class TransactionResponse {

    private UUID id;

    // --- CONTEXT: ACCOUNT ---
    private UUID accountId;
    private String accountName;
    private String currency; // WAJIB ADA: Biar frontend tau ini IDR, USD, atau SGD

    // --- CONTEXT: CATEGORY ---
    // Nullable (karena Transfer gak punya kategori)
    private Long categoryId;
    private String categoryName;

    // --- TRANSACTION DETAILS ---
    private BigDecimal amount;

    // Tips: String lebih aman daripada Enum buat DTO response biar frontend gak error
    // kalau backend nambah tipe baru tapi frontend belum update.
    private String type;

    private String description;

    // --- CONTEXT: TRANSFER ---
    // ID pasangan transaksinya.
    // Frontend bisa pakai ini buat bikin link "Lihat Sisi Penerima"
    private UUID transferPairId;

    // --- TIMEZONE AGNOSTIC DATES ---
    // Shape STRING + Timezone UTC = Format "2023-10-05T14:30:00.000Z"
    // Huruf 'Z' di ujung itu tanda universal UTC.
    // Browser/Mobile App otomatis paham ini UTC dan bakal convert ke jam lokal user.

    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "UTC")
    private Instant transactionDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "UTC")
    private Instant createdAt;
}