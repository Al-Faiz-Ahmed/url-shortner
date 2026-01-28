// import { User } from "../../generated/prisma/client";
// import { User } from "../../generated/prisma/browser";

import { GeneratedURL } from "../../generated/prisma/client";

// input
export type IGenUniqueUrl = Pick<GeneratedURL, "givenURL" | "uniqueHash"> & {
  userId?: string | null;
};
