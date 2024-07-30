import { z } from "zod";

export const MAX_POST_CONTENT_LENGTH = 280;

export const PostFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Post content is too short" })
    .max(MAX_POST_CONTENT_LENGTH, { message: "Post content is too long" }),
});

export type PostFormSchemaType = z.infer<typeof PostFormSchema>;
