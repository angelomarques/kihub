"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { likes } from "../db/schema";
import { getAuthenticatedUser } from "../users/queries";

export async function likePost(postId: number) {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const hasAlreadyLiked = await db.query.likes.findFirst({
    where: (likes, { eq, and }) =>
      and(eq(likes.userId, user.id), eq(likes.postId, postId)),
  });

  if (hasAlreadyLiked) {
    await db
      .delete(likes)
      .where(and(eq(likes.userId, user.id), eq(likes.postId, postId)));

    return {
      status: "deleted",
    };
  }

  await db.insert(likes).values({
    userId: user.id,
    postId,
  });

  return { status: "created" };
}
