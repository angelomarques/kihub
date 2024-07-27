import { PostFormDialog } from "@/app/_components/post-form-dialog";
import { getAuthenticatedUser } from "@/server/users/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kihub | New Post",
};

export default async function PostFormModalPage() {
  const user = await getAuthenticatedUser();

  return <PostFormDialog user={user} />;
}
