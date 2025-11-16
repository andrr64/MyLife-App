package com.andreas.mylife.finance_service.dto.response;

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
@JsonInclude(JsonInclude.Include.NON_NULL) // Field null gak usah dikirim ke frontend (hemat bytes)
public class TransactionResponse {

    private UUID id;
    
    // Flat data Account (biar frontend gak perlu fetch ulang)
    private UUID accountId;
    private String accountName;

    // Flat data Category
    private Long categoryId;
    private String categoryName;

    private BigDecimal amount;
    private String type; // INCOME, EXPENSE, TRANSFER
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime transactionDate;

    // Khusus Transfer: Cukup kirim ID pasangannya saja
    private UUID transferPairId;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime createdAt;
}