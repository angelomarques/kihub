import { pgEnum } from "drizzle-orm/pg-core";

const postStatusEnumValues = ["pb", "ar"] as const;

export const postsStatusEnum = pgEnum("status", postStatusEnumValues);
