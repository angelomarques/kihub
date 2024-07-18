"use client";

import { LoadingSpinner } from "@/assets/loading-spinner";
import { usePostsByUsernameQuery } from "@/service/users";
import { useCallback, useRef } from "react";
import { PostItem } from "./item";

interface Props {
  username: string;
}

export function UserPostsList({ username }: Props) {
  const {
    data: posts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = usePostsByUsernameQuery(username);
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
          <PostItem key={post.id} data={post} ref={lastElementRef} />
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
