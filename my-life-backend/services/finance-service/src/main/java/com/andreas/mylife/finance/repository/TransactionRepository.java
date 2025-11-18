package com.andreas.mylife.finance.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.andreas.mylife.finance.model.Transaction;

import java.time.ZonedDateTime;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    // 1. HISTORY TRANSAKSI UTAMA (Wajib Pagination)
    // "JOIN FETCH" memaksa Hibernate mengambil data Account & Category SEKALIGUS
    // dalam 1 query.
    // Ini mencegah N+1 Problem yang bikin aplikasi lemot.
    // PERBAIKAN QUERY: Handle NULL parameter
    @Query(value = "SELECT t FROM Transaction t " +
            "JOIN FETCH t.account " +
            "LEFT JOIN FETCH t.category " +
            "WHERE t.userId = :userId " +
            // CAST biar Postgres tau ini tipe data timestamp (waktu)
            "AND (CAST(:startDate AS timestamp) IS NULL OR t.transactionDate >= :startDate) " +
            "AND (CAST(:endDate AS timestamp) IS NULL OR t.transactionDate <= :endDate)",

            // COUNT QUERY JUGA WAJIB DIPERBAIKI
            countQuery = "SELECT COUNT(t) FROM Transaction t WHERE t.userId = :userId " +
                    "AND (CAST(:startDate AS timestamp) IS NULL OR t.transactionDate >= :startDate) " +
                    "AND (CAST(:endDate AS timestamp) IS NULL OR t.transactionDate <= :endDate)")
    Page<Transaction> findHistory(UUID userId, ZonedDateTime startDate, ZonedDateTime endDate, Pageable pageable);

    // 2. Filter per Akun (Misal: History spesifik dompet BCA)
    Page<Transaction> findByAccountId(UUID accountId, Pageable pageable);

    // 3. Cek Pasangan Transfer (Untuk keperluan update/delete)
    // Karena OneToOne lazy, kita query manual biar aman
    @Query("SELECT t FROM Transaction t WHERE t.transferPair.id = :pairId")
    Transaction findLinkedTransfer(UUID pairId);

    // 4. Dashboard Summary: Total Pemasukan/Pengeluaran bulan ini
    // Jauh lebih cepat hitung di DB daripada tarik semua data ke Java lalu loop
    /*
     * @Query("SELECT SUM(t.amount) FROM Transaction t " +
     * "WHERE t.userId = :userId AND t.type = 'EXPENSE' " +
     * "AND t.transactionDate BETWEEN :start AND :end")
     * BigDecimal sumExpenseByUserAndDate(UUID userId, ZonedDateTime start,
     * ZonedDateTime end);
     */
}