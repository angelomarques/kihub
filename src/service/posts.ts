import axios, { AxiosError } from "axios";
import {
  useMutation,
  MutationOptions,
  QueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { PostsTable, UsersTable } from "@/server/db/types";
import { PostFormSchemaType } from "@/lib/schemas/post-form";

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

type PostsQueryResponse = (PostsTable & { author: UsersTable })[];

export function usePostsQuery(
  queryOptions?: Omit<
    QueryOptions<PostsQueryResponse, AxiosError<string>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<PostsQueryResponse, AxiosError<string>>({
    queryFn: async () => {
      const { data } = await axios.get<PostsQueryResponse>("/api/posts");

      return data;
    },
    queryKey: ["posts"],
    ...queryOptions,
  });
}
