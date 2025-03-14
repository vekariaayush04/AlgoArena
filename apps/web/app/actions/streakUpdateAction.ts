"use server";
import { prisma } from "@repo/db/prisma";
import { differenceInBusinessDays } from "date-fns";

export async function updateStreaks({ id }: { id: string }) {
  const lastAcceptedSubmission  = await prisma.submission.findMany({
    where: { status: "ACCEPTED", userId: id },
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
    take:2
  });
  
  const user = await prisma.user.findUnique({
    where: { id },
    select: { currentStreak: true, maxStreak: true },
  });

  if (!user) return;

  let newStreak = 1;
  //only update when length is 2 if it is 1 that means its users first accepted submission so streak is 1 no need for further calculations :)
  if (lastAcceptedSubmission && lastAcceptedSubmission.length !== 1) {
    const daysDiff = differenceInBusinessDays(
      new Date(),
      lastAcceptedSubmission[1]?.updatedAt!
    );
        
    if (daysDiff === 1) {
      newStreak = (user.currentStreak ?? 0) + 1; // Increment streak
    }
  }

  const newMaxStreak = Math.max(newStreak, user.maxStreak ?? 0); 

  await prisma.user.update({
    where: { id },
    data: {
      currentStreak: newStreak,
      maxStreak: newMaxStreak,
    },
  });
}
