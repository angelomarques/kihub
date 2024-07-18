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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RequestStatusType } from "@/server/types";

interface Props {
  data: PostListQueryType;
  isInternalPage?: boolean;
}

export const PostItem = forwardRef<HTMLDivElement, Props>(function PostItem(
  { data, isInternalPage = false },
  ref,
) {
  return (
    <article
      className={clsx("border-b border-b-zinc-100/20 px-4 py-3", {
        "cursor-pointer hover:bg-zinc-100/10": !isInternalPage,
      })}
      ref={ref}
    >
      {isInternalPage ? (
        <PostItemContent data={data} isInternalPage />
      ) : (
        <Link href={`/posts/${data.id}`}>
          <PostItemContent data={data} />
        </Link>
      )}
    </article>
  );
});

function PostItemContent({ data, isInternalPage = false }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const likePostWithPostId = likePost.bind(null, data.id);

  const handleLikeFormClick: MouseEventHandler<HTMLFormElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="flex gap-2">
      <UserAvatar
        picture={data.author.picture}
        username={data.author.username}
      />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium">
            {data.author.firstName} {data.author.lastName}
          </p>
          <div className="flex gap-1 text-sm text-zinc-400">
            <p>@{data.author.username}</p>
            <p>·</p>
            <p>{formatTimeAgoShort(String(data.createdAt))}</p>
          </div>
        </div>
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
                    queryClient.invalidateQueries({ queryKey: ["posts"] });
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
      </div>
    </div>
  );
}
