package com.andreas.mylife.financeservice.repository;

import com.andreas.mylife.common.dto.PieChartItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.andreas.mylife.financeservice.model.Transaction;

import java.math.BigDecimal;
import java.time.Instant; // PAKE INSTANT
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {


    @Query("SELECT t FROM Transaction t " +
            "WHERE t.userId = :userId " +
            "ORDER BY t.transactionDate DESC " +
            "LIMIT :limit ")
    List<Transaction> recentTransaction(
            @Param("limit") Long limit,
            @Param("userId") UUID userId
    );

    // 1. HISTORY TRANSAKSI UTAMA
    // Perbaikan:
    // - Parameter ganti ke Instant
    // - HAPUS CAST manual. Hibernate akan otomatis mapping Instant ke timestamptz Postgres.
    @Query(value = "SELECT t FROM Transaction t " +
            "JOIN FETCH t.account " +
            "LEFT JOIN FETCH t.category " +
            "WHERE t.userId = :userId " +
            "AND (:startDate IS NULL OR t.transactionDate >= :startDate) " +
            "AND (:endDate IS NULL OR t.transactionDate <= :endDate)",

            countQuery = "SELECT COUNT(t) FROM Transaction t WHERE t.userId = :userId " +
                    "AND (:startDate IS NULL OR t.transactionDate >= :startDate) " +
                    "AND (:endDate IS NULL OR t.transactionDate <= :endDate)")
    Page<Transaction> findHistory(
            @Param("userId") UUID userId,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate,
            Pageable pageable
    );

    // 2. Filter per Akun
    Page<Transaction> findByAccountId(UUID accountId, Pageable pageable);

    // 3. Cek Pasangan Transfer
    @Query("SELECT t FROM Transaction t WHERE t.transferPair.id = :pairId")
    Transaction findLinkedTransfer(@Param("pairId") UUID pairId);

    // 4. Dashboard Summary
    // Menggunakan COALESCE agar jika tidak ada data, return 0 (bukan NULL)
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
            "WHERE t.userId = :userId " +
            "AND t.transactionDate >= :startDate " +
            "AND t.transactionDate <= :endDate")
    BigDecimal sumMutationByUserAndDateRange(
            @Param("userId") UUID userId,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate
    );

    @Query("""
    SELECT COALESCE(SUM(t.amount), 0)
    FROM Transaction t
    JOIN t.category c
    WHERE t.userId = :userId
      AND t.transactionDate BETWEEN :startDate AND :endDate
      AND lower(c.name) LIKE lower(concat('%', :categoryName, '%'))
    """)
    BigDecimal sumByCategory(
            @Param("userId") UUID userId,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate,
            @Param("categoryName") String categoryName
    );

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM Transaction t
        JOIN t.category c
        WHERE t.userId = :userId
          AND t.transactionDate BETWEEN :startDate AND :endDate
          AND c.type_id = :type_id
    """)
    BigDecimal sumByType(
        @Param("userId") UUID userId,
        @Param("startDate") Instant startDate,
        @Param("endDate") Instant endDate,
        @Param("type_id") Short type
    );

    @Query("""
        SELECT new com.andreas.mylife.common.dto.ValueByCategory(
            c.name,
            COALESCE(SUM(t.amount), 0),
            null
        )
        FROM Transaction t
        JOIN t.category c
        WHERE
            t.userId = :userId
            AND t.transactionDate BETWEEN :startDate AND :endDate
            AND c.type_id = 0
        GROUP BY c.name
    """)
    List<PieChartItem<BigDecimal>> getExpensePieChartByCategoryName(
            @Param("userId") UUID userId,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate
    );

}