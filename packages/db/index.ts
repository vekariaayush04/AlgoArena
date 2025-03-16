import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export { Difficulty ,type Problem , STATUS , TESTCASESTATUS ,type Submission , ContestVisibility } from "@prisma/client";
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();


if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;