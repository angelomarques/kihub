import { UserPostsList } from "@/components/posts/user-list";
import { PostsWithAuthor } from "@/server/db/types";
import { getPostsByUsername } from "@/server/posts/queries";
import {
  getAuthenticatedUser,
  getUserByUsername,
} from "@/server/users/queries";
import {
  dehydrate,
  HydrationBoundary,
  InfiniteData,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserInfo } from "./user-info";
import { PageHeader } from "@/components/page-header";

interface Props {
  params: { username: string };
}

export function generateMetadata({ params: { username } }: Props): Metadata {
  return {
    title: `Kihub | @${username}`,
  };
}

export default async function UserPage({ params: { username } }: Props) {
  const authenticatedUser = await getAuthenticatedUser();
  const user = await getUserByUsername(username);
  const queryClient = new QueryClient();

  const isOwner = authenticatedUser
    ? authenticatedUser.username === username
    : false;

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

  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: async () => {
      const response = await getUserByUsername(user.username);

      return response;
    },
  });

  return (
    <div className="w-full">
      <PageHeader>Users</PageHeader>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserInfo username={username} isOwner={isOwner} />

        <UserPostsList username={username} />
      </HydrationBoundary>
    </div>
  );
}
