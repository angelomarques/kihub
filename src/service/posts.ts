import axios from "axios";
import { useMutation, MutationOptions } from "@tanstack/react-query";
import { PostsTable } from "@/server/db/types";
import { PostFormSchemaType } from "@/lib/schemas/post-form";

export function useCreatePostMutation(
  mutationOptions: Omit<
    MutationOptions<PostsTable, unknown, PostFormSchemaType>,
    "mutationFn"
  >,
) {
  return useMutation({
    mutationFn: async (payload: PostFormSchemaType) => {
      const { data } = await axios.post<PostsTable>("/api/posts", payload);

      return data;
    },
    ...mutationOptions,
  });
}
