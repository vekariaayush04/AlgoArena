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

  if (lastAcceptedSubmission) {
    const daysDiff = differenceInBusinessDays(
      new Date(),
      lastAcceptedSubmission[1]?.updatedAt!
    );
    
    console.log(lastAcceptedSubmission);
    
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
