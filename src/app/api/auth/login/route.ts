import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { user_id, password } = await request.json();

  if (!user_id || !password) {
    return NextResponse.json({ error: 'user_id and password are required' }, { status: 400 });
  }

  const cdpResponse = await fetch(`${process.env.CDP_AUTH_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ user_id, password }),
  });

  const data = await cdpResponse.json();

  if (!cdpResponse.ok) {
    return NextResponse.json({ error: data.error || 'Login failed' }, { status: cdpResponse.status });
  }

  const response = NextResponse.json({ success: true, user_name: data.user_name });

  response.cookies.set('session_token', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours, matches with API's token expiry
    path: '/',
  });

  // also store user_name in a non-httpOnly cookie so the frontend UI can display it
  response.cookies.set('user_name', data.user_name, {
    httpOnly: false,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  return response;
}