package com.andreas.mylife.finance_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andreas.mylife.finance_service.common.ApiPath;

@RestController
@RequestMapping(ApiPath.TX_TYPE)
public class TxTypeController {

    @GetMapping("/test")
    public ResponseEntity<String> getHelloWorld() {
        // Mengambil objek Authentication dari context
        var auth = SecurityContextHolder.getContext().getAuthentication();

        // Mendapatkan username (email) yang tadi diset di filter
        String userEmail = auth.getName();
        return ResponseEntity.ok("Hello, user: " + userEmail);
    }
}