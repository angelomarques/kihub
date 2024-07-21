import { EditUserSchema } from "@/lib/schemas/users";
import { updateUser } from "@/server/users/mutations";
import { getAuthenticatedUser } from "@/server/users/queries";
import { ZodError } from "zod";

export async function PATCH(request: Request) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = user.id;
  const body = await request.json();
  const payload = EditUserSchema.parse(body);

  try {
    const updated = await updateUser(userId, payload);

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.flatten()), { status: 422 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
