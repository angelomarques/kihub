import { getAuthenticatedUser } from "@/server/users/queries";
import { EditUserFormDialog } from "./dialog";
import { notFound } from "next/navigation";

export default async function EditUserPageModal() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return notFound();
  }

  return <EditUserFormDialog user={user} />;
}
