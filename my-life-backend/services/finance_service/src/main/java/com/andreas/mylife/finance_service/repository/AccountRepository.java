package com.andreas.mylife.finance_service.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.andreas.mylife.finance_service.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query(value = """
            SELECT id, user_id, name, amount, description, created_at, updated_at
            FROM accounts
            WHERE user_id = :userId
            ORDER BY name ASC
            LIMIT 1
        """, nativeQuery = true)
    Optional<Account> findByUserId(@Param("userId") UUID userId);

    @Query( value =  """
            SELECT EXISTS(
                SELECT 1
                FROM accounts
                WHERE name ILIKE CONCAT('%', name, '%')
            ) 
        """, nativeQuery = true)
    Boolean isNameLikeExists(@Param("name") String name);
}