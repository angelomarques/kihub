import { PostFormSchema } from "@/lib/schemas/post-form";
import { createPost } from "@/server/posts/mutations";
import { getPosts } from "@/server/posts/queries";
import { getAuthenticatedUser } from "@/server/users/queries";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { content } = PostFormSchema.parse(body);

    await createPost({
      authorId: user.id,
      content: content,
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.flatten()), { status: 422 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");

  try {
    const posts = await getPosts(page);

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (_error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
