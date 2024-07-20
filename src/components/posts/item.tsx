"use client";

import { PostListQueryType } from "@/server/db/types";
import { likePost } from "@/server/likes/mutations";
import { formatTimeAgoShort } from "@/utils/date";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { forwardRef, MouseEventHandler } from "react";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { RequestStatusType } from "@/server/types";

interface Props {
  data: PostListQueryType;
  revalidateKey?: string[];
}

export const PostItem = forwardRef<HTMLDivElement, Props>(function PostItem(
  { data, revalidateKey = [] },
  ref,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const isInternalPage = pathname.startsWith("/posts");

  const likePostWithPostId = likePost.bind(null, data.id);

  const handleLikeFormClick: MouseEventHandler<HTMLFormElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <article
      className={clsx("border-b border-b-zinc-100/20", {
        "cursor-pointer hover:bg-zinc-100/10": !isInternalPage,
      })}
      ref={ref}
    >
      <div className="flex gap-2">
        <div>
          <Link href={`/users/${data.author.username}`}>
            <UserAvatar
              picture={data.author.picture}
              username={data.author.username}
              className="ml-4 mt-3"
            />
          </Link>
          <Link href={`/posts/${data.id}`} className="block h-full w-full">
            <span className="sr-only">Access post</span>
          </Link>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link href={`/users/${data.author.username}`}>
              <p className="mt-3 text-lg font-medium">
                {data.author.firstName} {data.author.lastName}
              </p>
            </Link>
            <div className="flex flex-1 gap-1 text-sm text-zinc-400">
              <Link href={`/users/${data.author.username}`} className="mt-3">
                <p>@{data.author.username}</p>
              </Link>
              <Link
                href={`/posts/${data.id}`}
                className="flex flex-1 items-center gap-1 pt-3"
              >
                <p>·</p>
                <p>{formatTimeAgoShort(String(data.createdAt))}</p>
              </Link>
            </div>
          </div>
          <Link href={`/posts/${data.id}`} className="block pb-3 pr-4">
            <p className="mt-1 whitespace-pre-line">{data.content}</p>

            <div className="ml-auto mt-2 flex w-max items-center gap-0.5">
              <form
                action={() => {
                  toast.promise(likePostWithPostId, {
                    loading: "Loading...",
                    success: (data: { status: RequestStatusType }) => {
                      if (isInternalPage) {
                        router.refresh();
                      } else {
                        queryClient.invalidateQueries({
                          queryKey: revalidateKey,
                        });
                      }

                      if (data.status === "created") return "Post liked!";
                      return "Post unliked!";
                    },
                    error: "Could not like post",
                  });
                }}
                onClick={handleLikeFormClick}
              >
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Like</span>
                  {data.hasUserLiked ? (
                    <HeartIconSolid className="h-4 w-4 text-red-600" />
                  ) : (
                    <HeartIcon className="h-4 w-4" />
                  )}
                </Button>
              </form>
              <p>{data.likesCount}</p>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
});
