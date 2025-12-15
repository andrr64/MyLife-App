package com.andreas.mylife.financeservice.services.impl;

import com.andreas.mylife.common.dto.ValueByCategory;
import com.andreas.mylife.financeservice.dto.response.CashFlowChartResponse;
import com.andreas.mylife.financeservice.model.CategoryType;
import com.andreas.mylife.financeservice.model.CategoryTypeId;
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

    @Override
    public BigDecimal getIncomeThisMonth(UUID userId) {
        // sekarang dalam zona waktu sistem
        ZonedDateTime now = ZonedDateTime.now();

        // awal bulan (tanggal 1, jam 00:00)
        Instant startOfMonth = now.withDayOfMonth(1)
                .toLocalDate()
                .atStartOfDay(now.getZone())
                .toInstant();

        // akhir bulan (hari terakhir bulan ini, jam 23:59:59.999)
        Instant endOfMonth = now.withDayOfMonth(now.toLocalDate().lengthOfMonth())
                .withHour(23).withMinute(59).withSecond(59).withNano(999_000_000)
                .toInstant();

        return transactionRepository.sumByType(
                userId,
                startOfMonth,
                endOfMonth,
                (short) 1
        );
    }

    @Override
    public BigDecimal getExpenseThisMonth(UUID userId) {
        // sekarang dalam zona waktu sistem
        ZonedDateTime now = ZonedDateTime.now();

        // awal bulan (tanggal 1, jam 00:00)
        Instant startOfMonth = now.withDayOfMonth(1)
                .toLocalDate()
                .atStartOfDay(now.getZone())
                .toInstant();

        // akhir bulan (hari terakhir bulan ini, jam 23:59:59.999)
        Instant endOfMonth = now.withDayOfMonth(now.toLocalDate().lengthOfMonth())
                .withHour(23).withMinute(59).withSecond(59).withNano(999_000_000)
                .toInstant();

        return transactionRepository.sumByType(
                userId,
                startOfMonth,
                endOfMonth,
                (short) 0
        );
    }

    @Override
    public String getCurrentBalanceDisplay(UUID userId, boolean flag) {
        return accountRepository.getCurrentBalanceDisplay(userId, flag);
    }

    @Override
    public List<ValueByCategory<BigDecimal>> getThisMonthExpenseSummary(UUID userId) {
        // sekarang dalam zona waktu sistem
        ZonedDateTime now = ZonedDateTime.now();

        // awal bulan (tanggal 1, jam 00:00)
        Instant startOfMonth = now.withDayOfMonth(1)
                .toLocalDate()
                .atStartOfDay(now.getZone())
                .toInstant();

        // akhir bulan (hari terakhir bulan ini, jam 23:59:59.999)
        Instant endOfMonth = now.withDayOfMonth(now.toLocalDate().lengthOfMonth())
                .withHour(23).withMinute(59).withSecond(59).withNano(999_000_000)
                .toInstant();
        return transactionRepository.getThisMonthExpenseSummaryByCategory(userId, startOfMonth, endOfMonth);
    }
}