// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kihub_${name}`);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }).unique(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).notNull(),
    picture: varchar("picture", { length: 256 }),

    kindeId: varchar("kinde_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.firstName),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  likes: many(likes),
}));

export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 1024 }).notNull(),
    authorId: integer("author_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (example) => ({
    authorIndex: index("author_id_idx").on(example.authorId),
  }),
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  likes: many(likes),
}));

export const likes = createTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    postId: integer("post_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (example) => ({
    userIndex: index("user_id_idx").on(example.userId),
    postIndex: index("post_id_idx").on(example.postId),
  }),
);

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}));

// https://orm.drizzle.team/docs/rqb
