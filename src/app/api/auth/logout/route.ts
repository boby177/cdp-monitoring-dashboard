import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const user_id = cookieStore.get('user_id')?.value;

  if (user_id) {
    await fetch(`${process.env.CDP_AUTH_API_URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ user_id }),
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('session_token');
  response.cookies.delete('user_name');
  return response;
}