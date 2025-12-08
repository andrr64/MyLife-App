package com.andreas.mylife.financeservice.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.andreas.mylife.financeservice.model.Account;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    List<Account> findByUserId(UUID userId, Sort sort);

    Optional<Account> findByIdAndUserId(UUID id, UUID userId);

    boolean existsByUserIdAndName(UUID userId, String name);

    // BEST PRACTICE:
    // COALESCE(SUM(...), 0) -> Memastikan kalau tidak ada row, baliknya 0, bukan NULL.
    // COALESCE(a.balance, 0) -> Memastikan kalau ada row tapi balance null (jarang terjadi kalau schema not null), tetap aman.
    @Query("SELECT COALESCE(SUM(a.balance), 0) FROM Account a WHERE a.userId = :userId")
    BigDecimal sumCurrentBalanceByUserId(@Param("userId") UUID userId);

    @Query("""
    SELECT 
        CASE 
            WHEN :flag = false
                THEN CAST(COALESCE(SUM(a.balance), 0) AS string)
            ELSE '*********'
        END
    FROM Account a
    WHERE a.userId = :userId
""")
    String getCurrentBalanceDisplay(
            @Param("userId") UUID userId,
            @Param("flag") boolean flag
    );
}