package com.andreas.mylife.finance_service.repository;

import com.andreas.mylife.finance_service.model.Category;
import com.andreas.mylife.finance_service.model.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Logic Pro: Ambil kategori custom user + kategori default sistem (userId IS
    // NULL)
    @Query("SELECT c FROM Category c WHERE c.userId = :userId OR c.userId IS NULL")
    List<Category> findAllByUserIdOrSystem(UUID userId);

    // Filter berdasarkan tipe (Income/Expense) untuk dropdown menu
    // Logic: Kategori User + System, tapi difilter tipe-nya
    @Query("SELECT c FROM Category c WHERE (c.userId = :userId OR c.userId IS NULL) AND c.type = :type")
    List<Category> findByUserIdAndType(UUID userId, CategoryType type);

    @Query("""
                SELECT COUNT(c) > 0
                FROM Category c
                WHERE LOWER(c.name) = LOWER(:name)
                  AND c.type = :type
                  AND (c.userId = :userId OR c.userId IS NULL)
            """)
    boolean existsCategoryNameForUserOrGlobal(
            UUID userId,
            String name,
            CategoryType type);

}