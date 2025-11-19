package com.andreas.mylife.financeservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryRequest {

    @NotBlank(message = "Category name is required")
    @Size(max = 50, message = "Name max 50 chars")
    private String name;

    @NotBlank(message = "Type is required (INCOME, EXPENSE)")
    private String type; 
}