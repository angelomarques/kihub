import { posts, users } from "./schema";

export type UsersTable = typeof users.$inferSelect;

export type PostsTable = typeof posts.$inferSelect;

export type PostsWithAuthor = PostsTable & { author: UsersTable };
