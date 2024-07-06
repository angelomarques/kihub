import { z } from "zod";

export const MAX_POST_CONTENT_LENGTH = 280;

export const PostFormSchema = z.object({
  content: z.string().min(1).max(MAX_POST_CONTENT_LENGTH),
});

export type PostFormSchemaType = z.infer<typeof PostFormSchema>;
