import { PostsTable, UsersTable } from "@/server/db/types";
import { formatTimeAgoShort } from "@/utils/date";
import { HeartIcon } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";
import Link from "next/link";
import clsx from "clsx";

interface Props {
  data: PostsTable & { author: UsersTable };
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
          <Button variant="ghost" size="icon">
            <span className="sr-only">Like</span>
            <HeartIcon className="h-4 w-4" />
          </Button>
          <p>{data.likes}</p>
        </div>
      </div>
    </div>
  );
}
