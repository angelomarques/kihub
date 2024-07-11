import { PostForm } from "@/components/post-form";
import { getAuthenticatedUser } from "@/server/users/queries";

export default async function ComposePostPage() {
  const user = await getAuthenticatedUser();

  return (
    <div>
      <PostForm user={user} />
    </div>
  );
}
