import { PageHeader } from "@/components/page-header";
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
      <PageHeader>New Post</PageHeader>
      <PostForm user={user} />
    </div>
  );
}
