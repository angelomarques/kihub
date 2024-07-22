import { EditUserForm } from "@/components/edit-user-form";
import { getAuthenticatedUser } from "@/server/users/queries";
import { notFound } from "next/navigation";

interface Props {
  params: { username: string };
}

export default async function EditUserPage({ params: { username } }: Props) {
  const user = await getAuthenticatedUser();

  if (!user || user.username !== username) {
    return notFound();
  }

  return (
    <div>
      <EditUserForm user={user} />
    </div>
  );
}
