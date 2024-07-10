import { Post } from "@/components/post";
import { PostForm } from "@/components/post-form";
import { buttonVariants } from "@/components/ui/button";
import { getPosts } from "@/server/posts/queries";
import { getAuthenticatedUser } from "@/server/users/queries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kihub | Home",
};

export default async function Home() {
  const user = await getAuthenticatedUser();

  const posts = await getPosts();

  return (
    <div className="h-full w-full overflow-y-scroll">
      <Link
        className={buttonVariants({
          className: "absolute bottom-4 right-4 shadow-lg sm:hidden",
          size: "icon-lg",
        })}
        href="/compose/post"
      >
        <PencilSquareIcon className="h-8 w-8" />
      </Link>

      <PostForm className="hidden md:flex" user={user} />

      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </div>
  );
}
