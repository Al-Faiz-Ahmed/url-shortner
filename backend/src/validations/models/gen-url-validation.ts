import * as z from "zod";
import { IGenUniqueUrl } from "../../types/models";

export const vGenUniqueUrl = z.object({
  givenURL: z.url(),
  uniqueHash: z
    .string()
    .min(5, "Unique Hash Character Length Should be 5")
    .max(5, "Unique Hash Character Length Should be 5"),
  userId: z.uuid().optional(),
}) satisfies z.ZodType<IGenUniqueUrl>;

export const vUniqueHash = z.object({
  uniqueHash: z
    .string()
    .length(5, "Unique Hash Character Length Should be 5")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Unique Hash must only contain letters and numbers (no symbols or emojis)",
    ),
}) satisfies z.ZodType<{ uniqueHash: string }>;
