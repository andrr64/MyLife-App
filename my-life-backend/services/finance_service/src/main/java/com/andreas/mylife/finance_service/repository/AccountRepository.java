package com.andreas.mylife.finance_service.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.andreas.mylife.finance_service.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(UUID userId);

    Optional<Account> findAccountByUserId(UUID userId);

    Optional<Account> findByIdAndUserId(Long id, UUID userId);

    @Query(value = """
            SELECT EXISTS(
                SELECT 1
                FROM accounts
                WHERE name ILIKE CONCAT('%', :name, '%')
            )
            """, nativeQuery = true)
    Boolean isNameLikeExists(@Param("name") String name);
}