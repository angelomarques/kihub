import { PageHeader } from "@/components/page-header";
import { PostItem } from "@/components/posts/item";
import { getSinglePost } from "@/server/posts/queries";
import { getAuthenticatedUser } from "@/server/users/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Kihub | Post",
};

interface Props {
  params: { id: string };
}

export default async function PostPage({ params: { id } }: Props) {
  const postId = parseInt(id);
  const user = await getAuthenticatedUser();

  if (isNaN(postId)) return notFound();

  const post = await getSinglePost(postId);

  if (!post) return notFound();

  return (
    <>
      <PageHeader>Post</PageHeader>
      <PostItem
        allowArchive={!!user && user.id === post.author.id}
        data={post}
      />
    </>
  );
}
