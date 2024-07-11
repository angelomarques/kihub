import { PostForm } from "@/components/post-form";
import { Posts } from "@/components/posts";
import { buttonVariants } from "@/components/ui/button";
import { getPosts } from "@/server/posts/queries";
import { getAuthenticatedUser } from "@/server/users/queries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kihub | Home",
};

export default async function Home() {
  const user = await getAuthenticatedUser();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      return posts;
    },
  });

  return (
    <div className="w-full">
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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </div>
  );
}
