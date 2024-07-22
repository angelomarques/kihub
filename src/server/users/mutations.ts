import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { UpdateUserPayload } from "../db/types";

export async function updateUser(userId: number, payload: UpdateUserPayload) {
  const response: { username: string }[] = await db
    .update(users)
    .set(payload)
    .where(eq(users.id, userId))
    .returning({ username: users.username });

  return response[0];
}
