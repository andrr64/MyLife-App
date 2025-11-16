package com.andreas.mylife.finance_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.andreas.mylife.finance_service.dto.projection.TxCategoryProjection;
import com.andreas.mylife.finance_service.model.TxCategory;

public interface TxCategoryRepository extends JpaRepository<TxCategory, Long> {
    @Query(value = """
            SELECT
                id,
                name,
                user_id AS userId
            FROM global_tx_type
            WHERE name ILIKE CONCAT('%', :name, '%')
            LIMIT 1
            """, nativeQuery = true)
    Optional<TxCategoryProjection> findGlobalCategoryByName(@Param("name") String name);

}