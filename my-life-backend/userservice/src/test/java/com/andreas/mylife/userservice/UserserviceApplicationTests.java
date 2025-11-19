package com.andreas.mylife.userservice; // <--- INI KUNCINYA, HARUS SAMA KAYA MAIN CLASS

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// Kalau masih error, bisa pake: @SpringBootTest(classes = UserserviceApplication.class)
@SpringBootTest
class UserserviceApplicationTests {

    @Test
    void contextLoads() {
        // Test sederhana cuma buat mastiin aplikasi bisa start
    }

}