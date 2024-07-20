"use client";

import { LoadingSpinner } from "@/assets/loading-spinner";
import { usePostsQuery } from "@/service/posts";
import { useCallback, useRef } from "react";
import { PostItem } from "./item";

export function PostsList() {
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
          <PostItem
            key={post.id}
            data={post}
            ref={lastElementRef}
            revalidateKey={["posts"]}
          />
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
