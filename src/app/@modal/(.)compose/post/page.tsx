import { PostFormDialog } from "@/app/_components/post-form-dialog";
import { getAuthenticatedUser } from "@/server/users/queries";

export default async function PostFormModalPage() {
  const user = await getAuthenticatedUser();

  return <PostFormDialog user={user} />;
}
