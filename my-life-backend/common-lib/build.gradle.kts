// MY-LIFE-BACKEND/common-lib/build.gradle.kts

plugins {
    `java-library` // Penting: Ini library, bukan aplikasi Spring Boot
}

group = "com.mylife" // Samain group-nya
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Pindahin semua dependensi yang di-share ke sini
    // Contoh: JwtUtil butuh ini

    // Pakai 'api' biar bisa di-ekspos ke service lain
    api("io.jsonwebtoken:jjwt-api:0.13.0") 
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.13.0")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.13.0")

    // Lombok
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
}