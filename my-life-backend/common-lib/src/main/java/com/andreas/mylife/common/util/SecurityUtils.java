package com.andreas.mylife.common.util; // Sesuaikan package common kamu

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

public class SecurityUtils {

    private SecurityUtils() {
        // Private constructor
    }

    public static UUID getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Validasi ketat
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            throw new IllegalStateException("Current user is not authenticated");
        }

        try {
            // Asumsi: Principal (auth.getName()) selalu menyimpan UUID String
            return UUID.fromString(auth.getName());
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("User ID in security context is not a valid UUID");
        }
    }
}