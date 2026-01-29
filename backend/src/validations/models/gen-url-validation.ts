import * as z from "zod";
import { IGenUniqueUrl } from "../../types/models";

export const vGenUniqueUrl = z.object({
  givenURL: z.url(),
  uniqueHash: z
    .string()
    .min(5, "Unique Hash Character Length Should be 5")
    .max(5, "Unique Hash Character Length Should be 5"),
  userId: z.string().optional()
}) satisfies z.ZodType<IGenUniqueUrl>;
