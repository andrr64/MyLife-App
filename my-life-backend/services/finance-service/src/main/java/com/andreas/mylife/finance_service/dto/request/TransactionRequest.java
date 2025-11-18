package com.andreas.mylife.finance_service.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class TransactionRequest {

    /**
     * Akun Utama yang terpengaruh.
     * - Kalau EXPENSE: Akun yang duitnya berkurang (BCA/Cash).
     * - Kalau INCOME: Akun yang duitnya nambah (BCA/Cash).
     * - Kalau TRANSFER: Akun PENGIRIM (Source).
     */
    @NotNull(message = "Account ID is required")
    private UUID accountId;

    /**
     * Khusus TRANSFER.
     * Akun PENERIMA (Destination).
     * Kosongkan jika tipe INCOME atau EXPENSE.
     */
    private UUID targetAccountId;

    /**
     * Khusus INCOME atau EXPENSE.
     * Label kategori (Gaji, Makan, Transport).
     * Kosongkan jika tipe TRANSFER.
     */
    private Long categoryId;

    /**
     * Nominal uang.
     * User WAJIB input angka POSITIF (misal: 50000).
     * Logic Backend yang akan menentukan dia jadi minus atau plus di database.
     */
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    /**
     * Tipe Transaksi.
     * Values: "INCOME", "EXPENSE", "TRANSFER"
     */
    @NotBlank(message = "Transaction type is required")
    private String type;

    private String description;

    /**
     * Tanggal Transaksi.
     * Boleh null (nanti backend otomatis pakai waktu sekarang/NOW).
     * Format JSON: "2025-11-16T10:00:00Z"
     */
    private ZonedDateTime transactionDate;
}