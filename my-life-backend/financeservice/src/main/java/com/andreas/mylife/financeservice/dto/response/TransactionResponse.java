package com.andreas.mylife.financeservice.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // Field yang NULL gak usah dikirim (Hemat bandwidth)
public class TransactionResponse {

    private UUID id;

    // --- FLAT DATA ACCOUNT (Biar frontend gak perlu nembak API lagi) ---
    private UUID accountId;
    private String accountName;

    // --- FLAT DATA CATEGORY (Hanya muncul di Income/Expense) ---
    private Long categoryId;
    private String categoryName;

    // --- DATA UTAMA ---
    private BigDecimal amount;
    private String type; // INCOME, EXPENSE, TRANSFER
    private String description;

    // --- KHUSUS TRANSFER ---
    // ID pasangan transaksinya (misal: ID transaksi di Akun Penerima)
    private UUID transferPairId;

    // --- WAKTU ---
    // Format ISO-8601 standard (Frontend friendly)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime transactionDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime createdAt;
}