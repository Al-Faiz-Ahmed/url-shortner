


import * as z from "zod";
import { IGenUniqueUrl } from "../../types/models";

export const vUserUUID = z.object({
  userId: z.uuid()
}) satisfies z.ZodType<{userId:string}>;