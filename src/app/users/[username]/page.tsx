import { UserPostsList } from "@/components/posts/user-list";
import { PostsWithAuthor } from "@/server/db/types";
import { getPostsByUsername } from "@/server/posts/queries";
import { getUserByUsername } from "@/server/users/queries";
import {
  dehydrate,
  HydrationBoundary,
  InfiniteData,
  QueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { username: string };
}

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserByUsername(username);
  const queryClient = new QueryClient();

  if (!user) return notFound();

  await queryClient.prefetchQuery({
    queryKey: ["users", username, "posts"],
    queryFn: async () => {
      const posts = await getPostsByUsername(username);

      return { pages: [posts], pageParams: [1] } as InfiniteData<
        PostsWithAuthor[]
      >;
    },
  });

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserPostsList username={username} />
      </HydrationBoundary>
    </div>
  );
}
