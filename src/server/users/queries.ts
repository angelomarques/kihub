import { db } from "../db";

export function getUserByKindeId(kindeId: string) {
  return db.query.users.findFirst({
    where: (model, { eq }) => eq(model.kindeId, kindeId),
  });
}
