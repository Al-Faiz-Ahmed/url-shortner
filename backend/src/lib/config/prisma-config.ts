import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { envConfig } from "./env-config";

const adapter = new PrismaPg({ connectionString: envConfig.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export { prisma };
