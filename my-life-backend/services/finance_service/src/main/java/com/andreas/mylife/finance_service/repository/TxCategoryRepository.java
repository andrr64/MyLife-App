package com.andreas.mylife.finance_service.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.andreas.mylife.finance_service.model.TxCategory;

public interface TxCategoryRepository extends JpaRepository<TxCategory, Long> {
    @Query(value = """
                SELECT *
                FROM tx_categories
                WHERE
                    name ILIKE CONCAT('%', :name, '%')
                    AND user_id = :user_id
                LIMIT 1
            """, nativeQuery = true)
    Optional<TxCategory> findCategoryByNameLike(@Param("name") String name, @Param("user_id") UUID userId);
}