package com.andreas.mylife.financeservice.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andreas.mylife.financeservice.dto.request.AccountRequest;
import com.andreas.mylife.financeservice.dto.response.AccountResponse;
import com.andreas.mylife.financeservice.exception.BusinessValidationException;
import com.andreas.mylife.financeservice.model.Account;
import com.andreas.mylife.financeservice.model.AccountType;
import com.andreas.mylife.financeservice.repository.AccountRepository;
import com.andreas.mylife.financeservice.services.AccountService;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

	private final AccountRepository accountRepository;

	@Override
	@Transactional
	public AccountResponse createAccount(UUID userId, AccountRequest request) {
		log.info("Creating account for user: {}, name: {}", userId, request.getName());

		// 1. Validasi Bisnis: Cek nama duplikat di user yg sama
		boolean exists = accountRepository.existsByUserIdAndName(userId, request.getName());
		if (exists) {
			throw new BusinessValidationException(
					"Account with name '" + request.getName() + "' already exists.");
		}

		// 2. Validasi & Konversi Tipe Akun (String -> Enum)
		// 2. Validasi & Konversi Tipe Akun (String -> Enum)
		AccountType accountType;
		try {
			accountType = AccountType.valueOf(request.getType().toUpperCase());
		} catch (IllegalArgumentException e) {
			// Ambil semua value enum secara dinamis, join pakai koma
			String allowedTypes = java.util.Arrays.stream(AccountType.values())
					.map(Enum::name)
					.collect(java.util.stream.Collectors.joining(", "));

			throw new BusinessValidationException(
					"Invalid account type: '" + request.getType() + "'. Allowed types are: ["
							+ allowedTypes + "]");
		}
		// 3. Mapping Request ke Entity
		Account account = Account.builder()
				.userId(userId)
				.name(request.getName())
				.type(accountType) // Set menggunakan Enum yang sudah divalidasi
				.currency("IDR")
				.isActive(true) // Default active
				.balance(request.getInitialBalance() != null ? request.getInitialBalance()
						: BigDecimal.ZERO)
				.build();

		// 4. Save ke DB
		Account savedAccount = accountRepository.save(account);

		// 5. Return Response
		return mapToResponse(savedAccount);
	}

	@Override
	@Transactional(readOnly = true)
	public List<AccountResponse> getAccountsByUserId(UUID userId) {
		Sort sort = Sort.by(
				Sort.Order.asc("type"),
				Sort.Order.asc("name"));
		return accountRepository.findByUserId(userId, sort)
				.stream()
				.map(this::mapToResponse)
				.collect(Collectors.toList());
	}

	// --- Helper Methods ---
	private AccountResponse mapToResponse(Account account) {
		return AccountResponse.builder()
				.id(account.getId())
				.name(account.getName())
				// Convert Enum ke String untuk Response JSON
				.type(account.getType().name())
				.balance(account.getBalance())
				.currency(account.getCurrency())
				.createdAt(account.getCreatedAt())
				.build();
	}
}