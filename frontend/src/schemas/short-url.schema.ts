import { z } from "zod";

export const shortUrlSchema = z.object({
  url: z.url("Please Type Valid URL"),
});

export type ShortUrlFormValues = z.infer<typeof shortUrlSchema>;

