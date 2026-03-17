import { GeneratedURL, User } from "../../generated/prisma/client";

// input
export type IGenUniqueUrl = Pick<GeneratedURL, "givenURL" | "uniqueHash"> & {
  userId?: string;
};

export type IUpdateUrl = Pick<
  GeneratedURL,
  "userId" | "givenURL" | "isBlock" | "expirationDate"
> & {
  urlId: GeneratedURL["id"]
  extendDays: number;
};
