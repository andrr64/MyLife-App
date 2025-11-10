package com.andreas.mylife.finance_service.config;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.andreas.mylife.finance_service.util.JwtVerifier;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtVerifier jwtVerifier;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Kalau tidak ada token, lanjut saja (nanti ditolak di SecurityConfig jika
            // butuh auth)
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = authHeader.substring(7); // Hapus tulisan "Bearer "
            String username = jwtVerifier.validateTokenAndGetUsername(token);

            // Jika token valid, kita buat kartu akses sementara untuk request ini
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null,
                    new ArrayList<>());

            // Simpan kartu akses di SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            // Token tidak valid/expired. Jangan set authentication.
            // Nanti akan otomatis ditolak 403 oleh Spring Security.
            System.out.println("Token invalid: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
