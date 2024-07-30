import { getPostsByUsername } from "@/server/posts/queries";
import { getAuthenticatedUser } from "@/server/users/queries";

export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");

  const { username } = params;
  let usernameToQuery = username;

  try {
    if (username === "me") {
      const user = await getAuthenticatedUser();

      if (!user) {
        return new Response("Unauthorized", { status: 401 });
      }

      usernameToQuery = user.username;
    }

    const posts = await getPostsByUsername(usernameToQuery, page);

    if (!posts) {
      return new Response("Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (_error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
