// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simple check for demo purposes. 
  // In production, check Supabase session cookie here.
  const isLoggedIn = request.cookies.get('sb-access-token'); 
  
  if (!isLoggedIn && !request.nextUrl.pathname.startsWith('/login')) {
     return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/research/:path*'],
}