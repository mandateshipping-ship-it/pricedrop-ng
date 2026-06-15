import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // Or use Firebase session

  // Protected routes
  const protectedRoutes = ['/dashboard', '/watchlist', '/admin', '/my-devices'];

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Admin-only routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // In production: verify custom claims or role from Firestore
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/watchlist', '/my-devices'],
};