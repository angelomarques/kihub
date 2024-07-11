import { PostForm } from "@/components/post-form";
import { getAuthenticatedUser } from "@/server/users/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kihub | New Post",
};

export default async function ComposePostPage() {
  const user = await getAuthenticatedUser();

  return (
    <div>
      <PostForm user={user} />
    </div>
  );
}
