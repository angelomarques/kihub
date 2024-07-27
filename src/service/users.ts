import { EditUserSchemaType } from "@/lib/schemas/users";
import { PostListQueryType, UsersTable } from "@/server/db/types";
import {
  InfiniteData,
  MutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
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
    MutationOptions<
      Pick<UsersTable, "username">,
      AxiosError<string>,
      EditUserSchemaType
    >,
    "mutationFn"
  >,
) {
  return useMutation<
    Pick<UsersTable, "username">,
    AxiosError<string>,
    EditUserSchemaType
  >({
    mutationFn: async (payload) => {
      const { data } = await axios.patch<Pick<UsersTable, "username">>(
        "/api/users",
        payload,
      );

      return data;
    },
    ...mutationOptions,
  });
}

export function useUserByUsernameQuery(
  username: string,
  queryOptions?: Omit<
    UseQueryOptions<UsersTable, AxiosError<string>, UsersTable>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<UsersTable, AxiosError<string>, UsersTable>({
    queryFn: async () => {
      const { data } = await axios.get<UsersTable>(`/api/users/${username}`);

      return data;
    },
    queryKey: ["users", username],
    ...(queryOptions ?? {}),
  });
}
