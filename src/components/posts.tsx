"use client";

import { PostsTable, UsersTable } from "@/server/db/types";
import { formatTimeAgoShort } from "@/utils/date";
import { UserAvatar } from "./user-avatar";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { usePostsQuery } from "@/service/posts";
import { LoadingSpinner } from "@/assets/loading-spinner";
import { forwardRef, useCallback, useRef } from "react";

export function Posts() {
  const {
    data: posts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = usePostsQuery();
  const observer = useRef<IntersectionObserver>();
  const isLoading = isFetchingNextPage || isFetching;

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  if (!posts) return null;

  return (
    <>
      {posts.pages.map((page) =>
        page.map((post) => (
          <Post key={post.id} data={post} ref={lastElementRef} />
        )),
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <LoadingSpinner fill="white" />
        </div>
      )}
    </>
  );
}

interface Props {
  data: PostsTable & { author: UsersTable };
}

const Post = forwardRef<HTMLDivElement, Props>(function Post({ data }, ref) {
  return (
    <article
      className="cursor-pointer border-b border-b-zinc-100/20 px-4 py-3 hover:bg-zinc-100/10"
      ref={ref}
    >
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
    </article>
  );
});
