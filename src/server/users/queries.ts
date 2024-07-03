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
