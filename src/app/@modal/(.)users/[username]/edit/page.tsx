import { getAuthenticatedUser } from "@/server/users/queries";
import { EditUserFormDialog } from "./dialog";
import { notFound } from "next/navigation";

interface Props {
  params: { username: string };
}

export default async function EditUserPageModal({
  params: { username },
}: Props) {
  const user = await getAuthenticatedUser();

  if (!user || user.username !== username) {
    return notFound();
  }

  return <EditUserFormDialog user={user} />;
}
