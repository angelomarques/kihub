import { getKindeUser } from "@/lib/kinde";
import { db } from "../db";

function getUserByKindeId(kindeId: string) {
  return db.query.users.findFirst({
    where: (model, { eq }) => eq(model.kindeId, kindeId),
  });
}

export async function getAuthenticatedUser() {
  const kindeUser = await getKindeUser();

  if (!kindeUser) return null;

  const user = await getUserByKindeId(kindeUser.id);

  if (!user) {
    return null;
  }

  return user;
}

export async function getUserByUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.username, username),
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function checkUsernameAvailability(username: string) {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: (model, { eq }) => eq(model.username, username),
  });

  return !user;
}
