package com.andreas.mylife.financeservice.services;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.financeservice.dto.request.CategoryRequest;
import com.andreas.mylife.financeservice.dto.response.CategoryResponse;

public interface CategoryService {
    CategoryResponse createCategory(UUID userId, CategoryRequest request);
    List<CategoryResponse> getCategories(UUID userId, String typeParam);
}
