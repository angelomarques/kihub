import { PostListQueryType } from "@/server/db/types";
import {
  UseInfiniteQueryOptions,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function usePostsByUsernameQuery(
  username: string,
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      PostListQueryType[],
      AxiosError<string>,
      InfiniteData<PostListQueryType[]>
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >,
) {
  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const [_contextKey, username] = queryKey as [string, string, string];
      const { data } = await axios.get<PostListQueryType[]>(
        `/api/users/${username}/posts`,
        {
          params: { page: pageParam },
        },
      );

      return data;
    },
    queryKey: ["users", username, "posts"],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
    ...queryOptions,
  });
}
