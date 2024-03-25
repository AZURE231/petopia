import { NextRequest, NextResponse } from 'next/server';
import { COOKIES_NAME } from './src/utils/constants';

export default function middleware(request: NextRequest) {
  if (!request.cookies.has(COOKIES_NAME.ACCESS_TOKEN_SERVER)) {
    const response = NextResponse.rewrite(new URL('/login', request.url));
    response.cookies.set(COOKIES_NAME.REDIRECT, request.nextUrl.pathname + request.nextUrl.search);
    return response;
  }
}

export const config = {
  matcher: ['/adopt'],
};