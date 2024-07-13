import { PostFormSchemaType } from "@/lib/schemas/post-form";
import { PostsTable, PostsWithAuthor } from "@/server/db/types";
import {
  InfiniteData,
  MutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useCreatePostMutation(
  mutationOptions: Omit<
    MutationOptions<PostsTable, AxiosError<string>, PostFormSchemaType>,
    "mutationFn"
  >,
) {
  return useMutation<PostsTable, AxiosError<string>, PostFormSchemaType>({
    mutationFn: async (payload: PostFormSchemaType) => {
      const { data } = await axios.post<PostsTable>("/api/posts", payload);

      return data;
    },
    ...mutationOptions,
  });
}

export function usePostsQuery(
  queryOptions?: Omit<
    UseInfiniteQueryOptions<
      PostsWithAuthor[],
      AxiosError<string>,
      InfiniteData<PostsWithAuthor[]>
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >,
) {
  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<PostsWithAuthor[]>("/api/posts", {
        params: { page: pageParam },
      });

      return data;
    },
    queryKey: ["posts"],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
    ...queryOptions,
  });
}
