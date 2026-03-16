import { z } from "zod";

export const editUrlSchema = z.object({
  givenURL: z
    .string({
      required_error: "Destination URL is required",
    })
    .url("Please type a valid URL"),
  expirationDate: z.date(),
  isBlock: z.boolean(),
});

export type EditUrlFormValues = z.infer<typeof editUrlSchema>;
