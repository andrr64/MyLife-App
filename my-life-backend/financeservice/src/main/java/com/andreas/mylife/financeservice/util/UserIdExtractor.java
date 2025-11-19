package com.andreas.mylife.financeservice.util;

import java.util.UUID;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

public class UserIdExtractor {

    private UserIdExtractor() {
        // private constructor biar gak bisa di-instantiate
    }

    public static UUID extractUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            throw new IllegalStateException("User not authenticated");
        }
        return UUID.fromString(auth.getName());
    }
}
