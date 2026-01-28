import * as z from "zod";
import { IGenUniqueUrl } from "../../types/models";

export const vGenUniqueUrl = z.object({
  //   email: z.email(),
  //   firstName: z.string().nullable(),
  //   lastName:z.string().nullable(),
  //   password:z.string().min(8,'password must be 8 charachters'),
  //   username:z.string()
  givenURL: z.url(),
  uniqueHash: z
    .string()
    .min(5, "Unique Hash Character Length Should be 5")
    .max(5, "Unique Hash Character Length Should be 5"),
  userId: z.uuidv4().nullable()
}) satisfies z.ZodType<IGenUniqueUrl>;
