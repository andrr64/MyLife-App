package com.andreas.mylife.finance_service.controller;

import com.andreas.mylife.finance_service.common.ApiPath;
import com.andreas.mylife.finance_service.dto.request.AccountRequest;
import com.andreas.mylife.finance_service.dto.response.AccountResponse;
import com.andreas.mylife.finance_service.dto.response.ApiResponse;
import com.andreas.mylife.finance_service.model.AccountType;
import com.andreas.mylife.finance_service.services.AccountService;
import com.andreas.mylife.finance_service.util.UserIdExtractor;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping(ApiPath.ACCOUNT) // Pastikan constant string path-nya sesuai (misal: "/api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {	

	private final AccountService accountService;

	/**
	 * Create New Account
	 * POST /api/v1/accounts/add
	 */
	@PostMapping("/add")
	public ApiResponse<AccountResponse> createAccount(@Valid @RequestBody AccountRequest request) {
		// 1. Extract User ID dari Token/Security Context
		UUID userId = UserIdExtractor.extractUserId();

		log.info("Request create account for user: {}", userId);

		// 2. Panggil Service
		AccountResponse response = accountService.createAccount(userId, request);

		// 3. Return object yang baru dibuat (Best Practice RESTful)
		return ApiResponse.success(response);
	}

	/**
	 * Get All Accounts (List View)
	 * GET /api/v1/accounts
	 */
	@GetMapping
	public ApiResponse<List<AccountResponse>> getAccounts() {
		// 1. Extract User ID
		UUID userId = UserIdExtractor.extractUserId();

		// 2. Panggil Service (Get All tanpa pagination)
		List<AccountResponse> accounts = accountService.getAccountsByUserId(userId);

		return ApiResponse.success(accounts);
	}

	@GetMapping("/types")
	public ApiResponse<Map<String, String>> getAccountTypes() {
		Map<String, String> map = new HashMap<>();
		for (AccountType type : AccountType.values()) {
			// key = name enum, value = bisa juga deskripsi / sama dengan name
			map.put(type.name(), type.getLabel());
		}
		return ApiResponse.success(map);
	}

}