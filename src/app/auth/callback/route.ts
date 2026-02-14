import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // Redirect to dashboard after successful auth
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
  }

  // If no code, redirect to home
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}
