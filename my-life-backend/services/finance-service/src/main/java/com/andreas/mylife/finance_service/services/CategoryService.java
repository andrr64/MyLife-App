package com.andreas.mylife.finance_service.services;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.finance_service.dto.request.CategoryRequest;
import com.andreas.mylife.finance_service.dto.response.CategoryResponse;

public interface CategoryService {
    CategoryResponse createCategory(UUID userId, CategoryRequest request);
    List<CategoryResponse> getCategories(UUID userId, String typeParam);
}
