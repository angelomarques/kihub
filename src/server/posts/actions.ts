"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { posts } from "../db/schema";
import { getAuthenticatedUser } from "../users/queries";
import { RequestStatusType } from "../types";

export async function archivePost(
  postId: number,
): Promise<{ status: RequestStatusType }> {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== user.id) {
    throw new Error("Unauthorized");
  }

  if (post.status === "ar") {
    throw new Error("Post already archived");
  }

  await db.update(posts).set({ status: "ar" }).where(eq(posts.id, postId));

  return {
    status: "updated",
  };
}
