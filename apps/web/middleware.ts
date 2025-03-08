// export { auth as middleware } from "./auth"

// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  // Create a fake NextApiRequest and NextApiResponse
  const req = {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    cookies: Object.fromEntries(
      request.cookies.getAll().map((cookie) => [cookie.name, cookie.value])
    ),
    query: Object.fromEntries(new URL(request.url).searchParams.entries()),
  };

  const res = {
    setHeader: (name: string, value: string) => {
      // Set headers on the NextResponse
      return NextResponse.next().headers.set(name, value);
    },
    getHeader: (name: string) => {
      // Get headers from the NextRequest
      return request.headers.get(name);
    },
  };

  // Call the auth function with the adapted request and response
  const session = await auth();


  // Continue with the request
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
