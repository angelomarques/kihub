import { EditUserSchemaType } from "@/lib/schemas/users";
import { PostListQueryType, UsersTable } from "@/server/db/types";
import {
  InfiniteData,
  MutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
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

export function useEditUserMutation(
  mutationOptions: Omit<
    MutationOptions<UsersTable, AxiosError<string>, EditUserSchemaType>,
    "mutationFn"
  >,
) {
  return useMutation<UsersTable, AxiosError<string>, EditUserSchemaType>({
    mutationFn: async (payload) => {
      const { data } = await axios.patch<UsersTable>("/api/users", payload);

      return data;
    },
    ...mutationOptions,
  });
}
