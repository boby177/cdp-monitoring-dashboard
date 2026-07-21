import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  // console.log('PROXY CHECK:', request.nextUrl.pathname, 'TOKEN EXISTS:', !!token);
  
  const isLoginPage = request.nextUrl.pathname === '/signin';

  // Check if user doesn't have a token and redirect to sign in page
  if (!token) {
    if (!isLoginPage) return NextResponse.redirect(new URL('/signin', request.url));
    return NextResponse.next();
  }

  const verifyResponse = await fetch(`${process.env.CDP_AUTH_API_URL}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ token }),
  });

  // console.log('VERIFY RESPONSE STATUS:', verifyResponse.status);

  if (!verifyResponse.ok) {
    // const errorBody = await verifyResponse.text();
    // console.log('VERIFY FAILED BODY:', errorBody);
    const response = NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('session_token');
    response.cookies.delete('user_name');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)',
  ],
};