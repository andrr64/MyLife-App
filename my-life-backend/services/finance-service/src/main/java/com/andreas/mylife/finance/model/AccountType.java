package com.andreas.mylife.finance.model;

import lombok.Getter;

@Getter
public enum AccountType {
    // --- ASSETS (Harta) ---
    CASH("Cash", AccountCategory.ASSET),
    BANK("Bank Transfer", AccountCategory.ASSET),
    E_WALLET("E-Wallet", AccountCategory.ASSET),
    INVESTMENT("Investment", AccountCategory.ASSET), // Reksadana, Saham
    
    // --- LIABILITIES (Kewajiban/Utang) ---
    CREDIT_CARD("Credit Card", AccountCategory.LIABILITY),
    PAYLATER("PayLater", AccountCategory.LIABILITY), // ShopeePayLater, Kredivo
    LOAN("Personal Loan", AccountCategory.LIABILITY); // Utang ke teman/Bank

    private final String label;
    private final AccountCategory category;

    AccountType(String label, AccountCategory category) {
        this.label = label;
        this.category = category;
    }
    
    public enum AccountCategory {
        ASSET,      // Harta (Saldo Positif menambah kekayaan) umunya nilai positiv
        LIABILITY   // Utang (Saldo Positif mengurangi kekayaan) umunya nilai negatif
        // total kekayaan = asset + liability
    }
}