import { db } from "../db";
import { posts } from "../db/schema";
import { CreatePostPayload } from "../db/types";

export function createPost(payload: CreatePostPayload) {
  return db.insert(posts).values(payload);
}
