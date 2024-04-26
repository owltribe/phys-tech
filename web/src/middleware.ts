import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
  if (
    [
      '/register',
      '/reset-password',
      '/forget-password',
    ].includes(request.nextUrl.pathname)
    && request.cookies.has('scienceservicesauth')
  ) {
    return NextResponse.redirect(new URL('/services', request.url))
  }
  if (
    [
      '/own-services',
    ].includes(request.nextUrl.pathname)
    && !request.cookies.has('scienceservicesauth')
  ) {
    return NextResponse.redirect(new URL('/services', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/register',
    '/own-services',
    '/reset-password',
    '/forget-password',
  ],
}