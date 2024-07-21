import { UserPostsList } from "@/components/posts/user-list";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { PostsWithAuthor } from "@/server/db/types";
import { getPostsByUsername } from "@/server/posts/queries";
import { getUserByUsername } from "@/server/users/queries";
import { CakeIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import {
  dehydrate,
  HydrationBoundary,
  InfiniteData,
  QueryClient,
} from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: { username: string };
}

export function generateMetadata({ params: { username } }: Props): Metadata {
  return {
    title: `Kihub | @${username}`,
  };
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
      <div className="border-b border-b-zinc-100/20 p-4">
        <div className="flex gap-5">
          <UserAvatar
            width={96}
            height={96}
            picture={user?.picture}
            username={user?.username}
          />
          <div className="flex-1">
            <div className="flex flex-1 justify-between">
              <div>
                <h1 className="text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
                <p className="mt-2 text-sm text-gray-500">@{user?.username}</p>
              </div>

              <Button variant="outline">Edit profile</Button>
            </div>

            <div className="flex items-center gap-4">
              {user.dateOfBirth && (
                <p className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                  <CakeIcon className="h-4 w-4" />
                  <span>
                    Born {formatDate(user.dateOfBirth, "MMMM dd, yyyy")}
                  </span>
                </p>
              )}

              <p className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>
                  Joined {formatDate(user.createdAt, "MMMM dd, yyyy")}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex-1">
          <p className="truncate-clamp-3 mt-2 text-sm">{user?.biography}</p>
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserPostsList username={username} />
      </HydrationBoundary>
    </div>
  );
}
