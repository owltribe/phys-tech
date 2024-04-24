import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/register' && request.cookies.has('scienceservicesauth')) {
    return NextResponse.redirect(new URL('/services', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/register',
}