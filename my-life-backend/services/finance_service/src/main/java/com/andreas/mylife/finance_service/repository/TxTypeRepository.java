package com.andreas.mylife.finance_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.andreas.mylife.finance_service.dto.projection.TxTypeProjection;
import com.andreas.mylife.finance_service.model.TxType;

public interface TxTypeRepository extends JpaRepository<TxType, Long> {
    @Query(value = """
            SELECT id, name, effect, 'PERSONAL' as type FROM tx_types WHERE user_id = :userId
            UNION ALL
            SELECT id, name, effect, 'GLOBAL' as type FROM global_tx_type
            """, nativeQuery = true)
    public List<TxTypeProjection> findAllByUserIdUnionGlobal(@Param("userId") UUID userId);
}