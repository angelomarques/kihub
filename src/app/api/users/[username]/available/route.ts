import {
  checkUsernameAvailability,
  getAuthenticatedUser,
} from "@/server/users/queries";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(
  _req: Request,
  { params }: { params: { username: string } },
) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { username } = params;

  try {
    const available = await checkUsernameAvailability(username);

    await delay(5000);

    return new Response(JSON.stringify({ available }), { status: 200 });
  } catch (_error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
