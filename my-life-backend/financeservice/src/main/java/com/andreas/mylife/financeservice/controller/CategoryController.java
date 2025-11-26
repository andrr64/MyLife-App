package com.andreas.mylife.financeservice.controller;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.common.util.SecurityUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.andreas.mylife.financeservice.common.ApiPath;
import com.andreas.mylife.financeservice.dto.request.CategoryRequest;
import com.andreas.mylife.financeservice.dto.response.ApiResponse;
import com.andreas.mylife.financeservice.dto.response.CategoryResponse;
import com.andreas.mylife.financeservice.services.CategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(ApiPath.CATEGORY)
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/add")
    public ApiResponse<CategoryResponse> addCategory(@Valid @RequestBody CategoryRequest request) {
        UUID userId = SecurityUtils.getCurrentUserId();
        CategoryResponse response = categoryService.createCategory(userId, request);
        return ApiResponse.success(response);
    }

    /**
     * Get Categories.
     * Bisa difilter pakai query param: /api/v1/categories?type=EXPENSE
     */
    @GetMapping
    public ApiResponse<List<CategoryResponse>> getCategories(
            @RequestParam(required = false) String type) {

        UUID userId = SecurityUtils.getCurrentUserId();
        List<CategoryResponse> response = categoryService.getCategories(userId, type);
        return ApiResponse.success(response);
    }
}
