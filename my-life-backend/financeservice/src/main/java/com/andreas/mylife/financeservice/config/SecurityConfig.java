package com.andreas.mylife.financeservice.config;

import com.andreas.mylife.common.config.JWTAuthenticationFilter;
import com.andreas.mylife.financeservice.common.ApiPath;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)

                // 1. AKTIFKAN CORS DI SINI
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(ApiPath.TX_TYPE + "/**").authenticated()
                        .requestMatchers(ApiPath.CATEGORY + "/**").authenticated()
                        .requestMatchers(ApiPath.ACCOUNT + "/**").authenticated()
                        .requestMatchers(ApiPath.TRANSACTION + "/**").authenticated()
                        .anyRequest().permitAll())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // 2. DEFINISI CONFIG CORS DEFAULT
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Izinkan asal request (Frontend Next.js)
        config.setAllowedOrigins(List.of("http://localhost:3000"));

        // Izinkan method HTTP standar
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Izinkan semua header (Content-Type, Authorization, dll)
        config.setAllowedHeaders(List.of("*"));

        // WAJIB TRUE: Karena auth pakai Cookie (HttpOnly)
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Terapkan config ini untuk semua endpoint finance
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}