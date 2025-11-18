package com.andreas.mylife.finance.services;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.finance.dto.request.CategoryRequest;
import com.andreas.mylife.finance.dto.response.CategoryResponse;

public interface CategoryService {
    CategoryResponse createCategory(UUID userId, CategoryRequest request);
    List<CategoryResponse> getCategories(UUID userId, String typeParam);
}
