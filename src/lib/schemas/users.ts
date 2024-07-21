import { z } from "zod";

export const EditUserSchema = z.object({
  firstName: z.string().min(1).max(256),
  lastName: z.string().min(1).max(256),
  username: z.string().min(1).max(256),
  biography: z.string().min(1).max(1024),
  picture: z.string().min(1).max(256),
  dateOfBirth: z.date(),
});

export type EditUserSchemaType = z.infer<typeof EditUserSchema>;
