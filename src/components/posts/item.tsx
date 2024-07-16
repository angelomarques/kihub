import { PostsWithAuthorAndLikesCount } from "@/server/db/types";
import { likePost } from "@/server/likes/mutations";
import { formatTimeAgoShort } from "@/utils/date";
import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";

interface Props {
  data: PostsWithAuthorAndLikesCount;
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
        <PostItemContent data={data} />
      ) : (
        <Link href={`/posts/${data.id}`}>
          <PostItemContent data={data} />
        </Link>
      )}
    </article>
  );
});

function PostItemContent({ data }: Props) {
  const likePostWithPostId = likePost.bind(null, data.id);

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
          <form action={likePostWithPostId}>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Like</span>
              <HeartIcon className="h-4 w-4" />
            </Button>
          </form>
          <p>{data.likesCount}</p>
        </div>
      </div>
    </div>
  );
}
