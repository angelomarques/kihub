import { PageHeader } from "@/components/page-header";
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

interface Props {
  params: { username: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export function generateMetadata({ params: { username } }: Props): Metadata {
  return {
    title: `Kihub | @${username}`,
  };
}

export default async function UserPage({ params: { username } }: Props) {
  const authenticatedUser = await getAuthenticatedUser();

  let usernameToQuery = username;
  if (usernameToQuery === "me") {
    if (!authenticatedUser) return notFound();

    usernameToQuery = authenticatedUser.username;
  }

  const user = await getUserByUsername(usernameToQuery);
  if (!user) return notFound();

  const queryClient = new QueryClient();

  const isOwner = authenticatedUser
    ? authenticatedUser.username === user.username
    : false;

  await queryClient.prefetchQuery({
    queryKey: ["users", username, "posts"],
    queryFn: async () => {
      const posts = await getPostsByUsername(usernameToQuery);

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

        <UserPostsList allowArchive={isOwner} username={username} />
      </HydrationBoundary>
    </div>
  );
}
