package com.andreas.mylife.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// PENTING: Scan package sendiri DAN package common-lib (tetangga)
// Kalau baris ini ilang, JwtUtil gak bakal ketemu
@ComponentScan(basePackages = {
        "com.andreas.mylife.userservice",
        "com.andreas.mylife.common"
})
public class UserserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserserviceApplication.class, args);
    }
}