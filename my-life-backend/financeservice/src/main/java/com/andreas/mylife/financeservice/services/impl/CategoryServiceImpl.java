package com.andreas.mylife.financeservice.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andreas.mylife.financeservice.dto.request.CategoryRequest;
import com.andreas.mylife.financeservice.dto.response.CategoryResponse;
import com.andreas.mylife.financeservice.exception.BusinessValidationException;
import com.andreas.mylife.financeservice.model.Category;
import com.andreas.mylife.financeservice.model.CategoryType;
import com.andreas.mylife.financeservice.repository.CategoryRepository;
import com.andreas.mylife.financeservice.services.CategoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryResponse createCategory(UUID userId, CategoryRequest request) {
        // -- VALIDASI --
        // 1. validasi tipe
        CategoryType type;
        try {
            type = CategoryType.valueOf(request.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessValidationException("Invalid category type. Allowed: INCOME, EXPENSE");
        }
        // 2. validasi apakah nama dan tipe kategori sudah exists
        if (categoryRepository.existsCategoryNameForUserOrGlobal(userId, request.getName(), type)) {
            throw new BusinessValidationException("Category '" + request.getName() + "' already exists for this type.");
        }

        // -- CREATE --
        // 1. buat entity
        Category category = Category.builder()
                .userId(userId)
                .name(request.getName())
                .type(type)
                .build();
        // 2. simpan
        Category saved = categoryRepository.save(category);

        // 3. return menjadi response
        return mapToResponse(saved, userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories(UUID userId, String typeParam) {
        List<Category> categories;
        if (typeParam != null && !typeParam.isBlank()) { // kondisi i -> ketika user ingin mengambil kategori tipe tertentu
            try {
                CategoryType type = CategoryType.valueOf(typeParam.toUpperCase());
                categories = categoryRepository.findByUserIdAndType(userId, type);
            } catch (IllegalArgumentException e) {
                throw new BusinessValidationException("Invalid type filter. Allowed: INCOME, EXPENSE");
            }
        } else { // kondisi 2 -> ambil semua data
            categories = categoryRepository.findAllByUserIdOrSystem(userId);
        }
        return categories.stream().map(
                c -> mapToResponse(c, userId)).toList();
    }

    private CategoryResponse mapToResponse(Category category, UUID currentUserId) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .type(category.getType().name())
                // // Kalau userId di DB null, berarti System Default. Kalau sama dengan current
                // // user, berarti Custom.
                // .isCustom(category.getUserId() != null &&
                // category.getUserId().equals(currentUserId))
                .build();
    }
}
