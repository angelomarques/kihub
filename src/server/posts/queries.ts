import { count, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { likes, posts, users } from "../db/schema";
import { PostsWithAuthorAndLikesCount } from "../db/types";

export async function getPosts(page = 1) {
  const pageSize = 10;

  const rows = await db
    .select({
      likesCount: count(likes.id),
      content: posts.content,
      createdAt: posts.createdAt,
      authorFirstName: users.firstName,
      authorLastName: users.lastName,
      authorPicture: users.picture,
      authorUsername: users.username,
      id: posts.id,
    })
    .from(posts)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(posts.createdAt))
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(likes, eq(posts.id, likes.postId))
    .groupBy(posts.id, users.id);

  const result = rows.map<Record<number, PostsWithAuthorAndLikesCount>>(
    (row) => {
      const {
        authorFirstName,
        authorLastName,
        authorPicture,
        authorUsername,
        ...rest
      } = row;

      return {
        ...rest,
        author: {
          firstName: authorFirstName,
          lastName: authorLastName,
          picture: authorPicture,
          username: authorUsername,
        },
      };
    },
  );

  return result;
}

export function getSinglePost(id: number) {
  return db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
    with: {
      author: true,
    },
  });
}
