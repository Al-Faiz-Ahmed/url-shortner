import { z } from "zod";

export const editUrlSchema = z.object({
  givenURL: z.url("Please type a valid URL"),
  expirationDate: z.date(),
  isBlock: z.boolean(),
});

export type EditUrlFormValues = z.infer<typeof editUrlSchema>;
