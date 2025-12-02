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
@JsonInclude(JsonInclude.Include.NON_NULL) // Hemat bandwidth
public class AccountResponse {

    private UUID id;
    private String name;

    // BANK, CASH, E_WALLET, PAYLATER
    private String type;

    private BigDecimal balance;
    private String currency;

    // --- STRICT UTC FORMATTING ---
    // Memastikan output selalu: "2023-10-05T14:30:00.000Z"
    // Tidak terpengaruh jam server (WIB/EST/dll)
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "UTC")
    private Instant createdAt;

    // Optional: Kalau nanti butuh updatedAt, formatnya samakan:
    // @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "UTC")
    // private Instant updatedAt;
}