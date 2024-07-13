import { db } from ".";

export type UsersTable = NonNullable<
  Awaited<ReturnType<(typeof db)["query"]["users"]["findFirst"]>>
>;

export type PostsTable = NonNullable<
  Awaited<ReturnType<(typeof db)["query"]["posts"]["findFirst"]>>
>;

export type PostsWithAuthor = PostsTable & { author: UsersTable };
