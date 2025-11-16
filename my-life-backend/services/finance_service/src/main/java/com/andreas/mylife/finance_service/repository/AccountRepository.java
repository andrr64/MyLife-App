package com.andreas.mylife.finance_service.repository;

import com.andreas.mylife.finance_service.model.Account;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    // Ambil semua akun milik user tertentu
    List<Account> findByUserId(UUID userId, Sort sort);

    // Validasi: Cek apakah akun milik user tersebut (untuk security check sebelum
    // transaksi)
    Optional<Account> findByIdAndUserId(UUID id, UUID userId);

    // Validasi: Mencegah nama akun duplikat di user yang sama
    boolean existsByUserIdAndName(UUID userId, String name);

    // Menghitung Total Aset User (Optional, kadang lebih cepat lewat DB daripada
    // Java)
    // @Query("SELECT SUM(a.balance) FROM Account a WHERE a.userId = :userId AND
    // a.type = 'BANK'")
    // BigDecimal sumBankBalanceByUserId(UUID userId);
}