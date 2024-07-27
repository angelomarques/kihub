import { getAuthenticatedUser } from "@/server/users/queries";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.error();
  }

  return NextResponse.redirect(new URL(`${user.username}`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/users/me",
};
