package com.andreas.mylife.financeservice.services.impl;

import com.andreas.mylife.common.exception.BusinessValidationException;
import com.andreas.mylife.common.exception.ResourceConflictException;
import com.andreas.mylife.financeservice.dto.request.CategoryRequest;
import com.andreas.mylife.financeservice.dto.response.CategoryResponse;
import com.andreas.mylife.financeservice.model.Category;
import com.andreas.mylife.financeservice.model.CategoryType;
import com.andreas.mylife.financeservice.repository.CategoryRepository;
import com.andreas.mylife.financeservice.services.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryResponse createCategory(UUID userId, CategoryRequest request) {
        CategoryType type;
        try {
            type = CategoryType.valueOf(request.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessValidationException("Invalid category type. Allowed: INCOME, EXPENSE");
        }

        if (categoryRepository.existsCategoryNameForUserOrGlobal(userId, request.getName(), type)) {
            throw new ResourceConflictException("Category '" + request.getName() + "' already exists for this type.");
        }

        Category category = Category.builder()
                .userId(userId)
                .name(request.getName())
                .type(type)
                .build();

        return mapToResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories(UUID userId, String typeParam) {
        List<Category> categories;
        if (typeParam != null && !typeParam.isBlank()) {
            try {
                CategoryType type = CategoryType.valueOf(typeParam.toUpperCase());
                categories = categoryRepository.findByUserIdAndType(userId, type);
            } catch (IllegalArgumentException e) {
                throw new BusinessValidationException("Invalid type filter. Allowed: INCOME, EXPENSE");
            }
        } else {
            categories = categoryRepository.findAllByUserIdOrSystem(userId);
        }
        return categories.stream().map(this::mapToResponse).toList();
    }

    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .type(category.getType().name())
                .build();
    }
}