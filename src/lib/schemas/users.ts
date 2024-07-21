import { z } from "zod";

export const EditUserSchema = z.object({
  firstName: z.string().min(1).max(256).optional(),
  lastName: z.string().min(1).max(256).optional(),
  username: z.string().min(1).max(256).optional(),
  biography: z.string().min(1).max(1024).optional(),
  picture: z.string().min(1).max(256).optional(),
  dateOfBirth: z.date().optional(),
});

export type EditUserSchemaType = z.infer<typeof EditUserSchema>;
