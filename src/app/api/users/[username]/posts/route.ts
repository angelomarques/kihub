import { getPostsByUsername } from "@/server/posts/queries";

export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");

  try {
    const posts = await getPostsByUsername(params.username, page);

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (_error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
