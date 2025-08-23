import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 응답 객체 생성
  const response = NextResponse.next();

  // 쿠키에 pathname 저장
  response.cookies.set("pathname", pathname, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7일
    httpOnly: false, // 클라이언트에서 접근 가능하도록 설정
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * 모든 페이지에서 실행되도록 설정
     * api, _next/static, _next/image, favicon.ico 제외
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
