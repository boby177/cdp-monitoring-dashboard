import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/signin';

  if (!token) {
    if (!isLoginPage) return NextResponse.redirect(new URL('/signin', request.url));
    return NextResponse.next();
  }

  const verifyResponse = await fetch(`${process.env.CDP_AUTH_API_URL}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ token }),
  });

  if (!verifyResponse.ok) {
    const response = NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('session_token');
    response.cookies.delete('user_name');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};