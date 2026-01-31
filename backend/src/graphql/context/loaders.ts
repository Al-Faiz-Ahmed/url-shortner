import DataLoader from "dataloader";
import type { PrismaClient } from "../../generated/prisma/client";
import type { GeneratedURL } from "../../generated/prisma/client";

/**
 * Batch loads generated URLs by user IDs. Used to avoid N+1 when resolving
 * User.generatedUrls in GraphQL.
 */
function createGeneratedUrlsByUserIdLoader(prisma: PrismaClient) {
  return new DataLoader<string, GeneratedURL[]>(async (userIds) => {
    const urls = await prisma.generatedURL.findMany({
      where: { userId: { in: [...userIds] } },
    });
    const byUserId = new Map<string, GeneratedURL[]>();
    for (const url of urls) {
      const list = byUserId.get(url.userId) ?? [];
      list.push(url);
      byUserId.set(url.userId, list);
    }
    return userIds.map((id) => byUserId.get(id) ?? []);
  });
}

export type Loaders = {
  generatedUrlsByUserId: ReturnType<typeof createGeneratedUrlsByUserIdLoader>;
};

export function createLoaders(prisma: PrismaClient): Loaders {
  return {
    generatedUrlsByUserId: createGeneratedUrlsByUserIdLoader(prisma),
  };
}
