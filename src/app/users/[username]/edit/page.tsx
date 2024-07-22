import { EditUserForm } from "@/components/edit-user-form";
import { getAuthenticatedUser } from "@/server/users/queries";
import { notFound } from "next/navigation";

export default async function EditUserPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <EditUserForm user={user} />
    </div>
  );
}
