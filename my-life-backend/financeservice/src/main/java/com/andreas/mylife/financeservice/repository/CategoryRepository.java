package com.andreas.mylife.financeservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.andreas.mylife.financeservice.model.Category;
import com.andreas.mylife.financeservice.model.CategoryType;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.userId = :userId OR c.userId IS NULL")
    List<Category> findAllByUserIdOrSystem(@Param("userId") UUID userId);

    @Query("SELECT c FROM Category c WHERE (c.userId = :userId OR c.userId IS NULL) AND c.type = :type")
    List<Category> findByUserIdAndType(@Param("userId") UUID userId, @Param("type") CategoryType type);

    // Optimized EXISTS query
    @Query("""
        SELECT COUNT(c) > 0
        FROM Category c
        WHERE LOWER(c.name) = LOWER(:name)
          AND c.type = :type
          AND (c.userId = :userId OR c.userId IS NULL)
    """)
    boolean existsCategoryNameForUserOrGlobal(
            @Param("userId") UUID userId,
            @Param("name") String name,
            @Param("type") CategoryType type);
}