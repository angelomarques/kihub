import { getUserByUsername } from "@/server/users/queries";

export async function GET(
  _req: Request,
  { params }: { params: { username: string } },
) {
  const { username } = params;

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return new Response("Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (_error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
