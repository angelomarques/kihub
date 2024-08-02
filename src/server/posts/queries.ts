import { and, count, desc, eq, not, SQL, sql } from "drizzle-orm";
import { db } from "../db";
import { likes, posts, users } from "../db/schema";
import { PostListQueryType } from "../db/types";
import { getAuthenticatedUser } from "../users/queries";

export async function getPosts(page = 1) {
  const pageSize = 10;

  const hasUserLikedSelectQuery: { hasUserLiked?: SQL<boolean> } = {};

  const user = await getAuthenticatedUser();

  if (user) {
    hasUserLikedSelectQuery.hasUserLiked = sql<boolean>`exists(select 1 from ${likes} where ${likes.postId} = ${posts.id} and ${likes.userId} = ${user.id})`;
  }

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
      ...hasUserLikedSelectQuery,
    })
    .from(posts)
    .where(not(eq(posts.status, "ar")))
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(posts.createdAt))
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(likes, eq(posts.id, likes.postId))
    .groupBy(posts.id, users.id);

  const result = rows.map<Record<number, PostListQueryType>>((row) => {
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
  });

  return result;
}

export async function getSinglePost(id: number) {
  const hasUserLikedSelectQuery: { hasUserLiked?: SQL<boolean> } = {};

  const user = await getAuthenticatedUser();

  if (user) {
    hasUserLikedSelectQuery.hasUserLiked = sql<boolean>`exists(select 1 from ${likes} where ${likes.postId} = ${posts.id} and ${likes.userId} = ${user.id})`;
  }

  const rows = await db
    .select({
      likesCount: count(likes.id),
      content: posts.content,
      createdAt: posts.createdAt,
      authorFirstName: users.firstName,
      authorLastName: users.lastName,
      authorPicture: users.picture,
      authorUsername: users.username,
      authorId: users.id,
      id: posts.id,
      ...hasUserLikedSelectQuery,
    })
    .from(posts)
    .where(and(eq(posts.id, id), not(eq(posts.status, "ar"))))
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(likes, eq(posts.id, likes.postId))
    .groupBy(posts.id, users.id);

  if (!rows[0]) return null;

  const {
    authorFirstName,
    authorLastName,
    authorPicture,
    authorUsername,
    authorId,
    ...rest
  } = rows[0];

  return {
    ...rest,
    author: {
      id: authorId,
      firstName: authorFirstName,
      lastName: authorLastName,
      picture: authorPicture,
      username: authorUsername,
    },
  } as PostListQueryType;
}

export async function getPostsByUsername(username: string, page = 1) {
  const pageSize = 10;

  const hasUserLikedSelectQuery: { hasUserLiked?: SQL<boolean> } = {};

  const user = await getAuthenticatedUser();

  if (user) {
    hasUserLikedSelectQuery.hasUserLiked = sql<boolean>`exists(select 1 from ${likes} where ${likes.postId} = ${posts.id} and ${likes.userId} = ${user.id})`;
  }

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
      ...hasUserLikedSelectQuery,
    })
    .from(posts)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(desc(posts.createdAt))
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(likes, eq(posts.id, likes.postId))
    .where(and(eq(users.username, username), not(eq(posts.status, "ar"))))
    .groupBy(posts.id, users.id);

  const result = rows.map<Record<number, PostListQueryType>>((row) => {
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
  });

  return result;
}
