import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id)
    throw new Error(
      `something went wrong with authentication: ${JSON.stringify(user)}`,
    );

  const dbUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.kindeId, user.id),
  });

  if (!dbUser) {
    await db.insert(users).values({
      email: user.email,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
      username: nanoid(10),
      kindeId: user.id,
      picture: user.picture,
    });
  }

  return redirect("/");
}
