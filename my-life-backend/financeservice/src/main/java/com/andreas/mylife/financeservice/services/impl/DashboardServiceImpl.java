package com.andreas.mylife.financeservice.services.impl;

import com.andreas.mylife.financeservice.dto.response.CashFlowChartResponse;
import com.andreas.mylife.financeservice.repository.AccountRepository;
import com.andreas.mylife.financeservice.repository.TransactionRepository;
import com.andreas.mylife.financeservice.services.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // TAMBAHAN PENTING
public class DashboardServiceImpl implements DashboardService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    // Definisikan ZoneId untuk Jakarta
    private static final ZoneId ZONE_JAKARTA = ZoneId.of("Asia/Jakarta");

    @Override
    public BigDecimal getPrevMonthBalance(Instant refDate, UUID userId) {
        // 1. Ambil Saldo Total SAAT INI
        BigDecimal currentBalance = accountRepository.sumCurrentBalanceByUserId(userId);

        // 2. Tentukan Awal Bulan Ini (berdasarkan Zone Jakarta)
        // Konversi Instant -> ZonedDateTime
        ZonedDateTime zdt = refDate.atZone(ZONE_JAKARTA);

        // Start: Tanggal 1 bulan ini jam 00:00:00
        ZonedDateTime startOfThisMonth = zdt.with(TemporalAdjusters.firstDayOfMonth())
                .toLocalDate()
                .atStartOfDay(ZONE_JAKARTA);

        // End: Detik ini (refDate)
        ZonedDateTime now = zdt;

        // 3. Hitung mutasi yang terjadi SEJAK awal bulan SAMPAI detik ini
        // (Income - Expense bulan ini yang sudah terjadi)
        BigDecimal mutationThisMonth = transactionRepository.sumMutationByUserAndDateRange(
                userId,
                startOfThisMonth.toInstant(),
                now.toInstant()
        );

        // 4. Hitung Mundur: Saldo Awal Bulan = Saldo Sekarang - Mutasi Bulan Ini
        return currentBalance.subtract(mutationThisMonth);
    }
}