import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { UpdateUserPayload } from "../db/types";

export async function updateUser(userId: number, payload: UpdateUserPayload) {
  return db.update(users).set(payload).where(eq(users.id, userId));
}
