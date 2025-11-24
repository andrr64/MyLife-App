import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Pastikan import URLPath ini sesuai lokasi file kamu
import { URLPath } from './app/path'; 

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Cek Status Login (Baca Cookie)
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');
  
  // Kita anggap user login jika minimal ada salah satu token
  const isLoggedIn = !!accessToken || !!refreshToken;

  // Debugging (Bisa dihapus nanti kalau sudah stable)
  console.log(`[Middleware] Path: ${pathname} | Status: ${isLoggedIn ? 'Login' : 'Guest'}`);

  // =================================================================
  // LOGIC 1: PROTEKSI HALAMAN PRIVATE (/app)
  // =================================================================
  if (pathname.startsWith('/app')) {
    if (!isLoggedIn) {
      // User coba masuk /app tapi belum login -> Redirect ke Login
      const loginUrl = new URL(URLPath.auth.login, request.url);
      // Simpan url asal di query param 'from' biar nanti bisa balik lagi
      loginUrl.searchParams.set('from', pathname);
      
      return NextResponse.redirect(loginUrl);
    }
  }

  // =================================================================
  // LOGIC 2: PROTEKSI HALAMAN AUTH (/auth)
  // =================================================================
  // Cek apakah user sedang membuka halaman login/register
  else if (pathname.startsWith('/auth')) {
    if (isLoggedIn) {
      // User ISENG buka halaman login padahal token masih aktif -> Redirect ke Home
      return NextResponse.redirect(new URL(URLPath.home, request.url));
    }
  }

  // =================================================================
  // LOGIC 3: LOLOS / PASS
  // =================================================================
  return NextResponse.next();
}

// Config Matcher: Middleware jalan di SEMUA route, KECUALI file static & API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};