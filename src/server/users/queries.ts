import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "../db";

function getUserByKindeId(kindeId: string) {
  return db.query.users.findFirst({
    where: (model, { eq }) => eq(model.kindeId, kindeId),
  });
}

export async function getAuthenticatedUser() {
  const { getUser } = getKindeServerSession();

  const kindeUser = await getUser();

  if (!kindeUser) return null;

  const user = await getUserByKindeId(kindeUser.id);

  if (!user) {
    return null;
  }

  return user;
}
