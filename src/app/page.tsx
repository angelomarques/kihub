import { PageHeader } from "@/components/page-header";
import { PostForm } from "@/components/post-form";
import { PostsList } from "@/components/posts/list";
import { buttonVariants } from "@/components/ui/button";
import { PostsWithAuthor } from "@/server/db/types";
import { getPosts } from "@/server/posts/queries";
import { getAuthenticatedUser } from "@/server/users/queries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  dehydrate,
  HydrationBoundary,
  InfiniteData,
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

      return { pages: [posts], pageParams: [1] } as InfiniteData<
        PostsWithAuthor[]
      >;
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

      <PageHeader hasBackButton={false}>Home</PageHeader>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostForm className="hidden md:flex" user={user} />

        <PostsList />
      </HydrationBoundary>
    </div>
  );
}
