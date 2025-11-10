package com.andreas.mylife.finance_service.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtVerifier {
    @Value("${jwt.secret}")
    private String secretKey;

    // Validasi dan ekstrak user email langsung
    public String validateTokenAndGetUsername(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey)))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject(); // Mengembalikan email user jika valid, error jika tidak
    }

}
