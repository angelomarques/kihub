import { posts, users } from "./schema";

export type UsersTable = typeof users.$inferSelect;
export type UpdateUserPayload = Pick<
  UsersTable,
  | "firstName"
  | "lastName"
  | "username"
  | "biography"
  | "picture"
  | "dateOfBirth"
>;

export type PostsTable = typeof posts.$inferSelect;
export type CreatePostPayload = typeof posts.$inferInsert;

export type PostsWithAuthor = PostsTable & { author: UsersTable };

export type PostListQueryType = PostsWithAuthor & {
  likesCount: number;
} & { hasUserLiked?: boolean };

export enum PostsStatusEnumType {
  PUBLISHED = "pb",
  ARCHIVED = "ar",
}
