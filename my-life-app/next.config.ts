import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Pintu masuk (Frontend URL)
        source: '/api/proxy/user-service/:path*',
        // Tujuan asli (Backend Spring Boot)
        destination: 'http://localhost:8080/api/user-service/:path*', 
      },
      {
        source: '/api/proxy/finance-service/:path*',
        destination: 'http://localhost:8081/api/v1/finance-service/:path*',
      }
    ];
  },
};

export default nextConfig;
