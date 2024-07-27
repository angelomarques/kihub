import { getAuthenticatedUser } from "@/server/users/queries";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (_error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
