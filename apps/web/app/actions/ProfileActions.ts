"use server";

import { prisma } from "@repo/db/prisma";
import { getCurrentSession } from "../session";
import { differenceInBusinessDays, formatDistance, getDate, getDay, getMonth, getYear } from "date-fns";
type ProfileData = {
  name: string;
  username: string;
  rank: string;
  profileImage: string;
  languages: string[];
};

export async function getProfileData(): Promise<ProfileData> {
  const { user } = await getCurrentSession();

  const profileData = {
    name: user?.name as string,
    username: user?.name as string,
    rank: "#200",
    profileImage: user?.image as string,
    languages: ["Javascript"],
  };

  return profileData;
}

type ProblemSolvingData = {
  solved: number;
  difficultyProgress: {
    difficulty: string;
    solved: number;
    total: number;
  }[];
};

export async function getProblemSolvingData(): Promise<ProblemSolvingData> {
  const { user } = await getCurrentSession();
  const problemsSolved = await prisma.submission.findMany({
    where: {
      userId: user?.id,
      status: "ACCEPTED",
    },
    include: {
      problem: true,
    },
    distinct: ["problemId"],
  });

  const [easyCount, mediumCount, hardCount] = await Promise.all([
    prisma.problem.count({ where: { difficulty: "EASY" } }),
    prisma.problem.count({ where: { difficulty: "MEDIUM" } }),
    prisma.problem.count({ where: { difficulty: "HARD" } }),
  ]);
  
  const easyDone = problemsSolved.reduce(
    (a, p: any) => (p.problem.difficulty === "EASY" ? a + 1 : a),
    0
  );

  const midDone = problemsSolved.reduce(
    (a, p) => (p.problem.difficulty === "MEDIUM" ? a + 1 : a),
    0
  );

  const hardDone = problemsSolved.reduce(
    (a, p) => (p.problem.difficulty === "HARD" ? a + 1 : a),
    0
  );

  const problemSolvingData = {
    solved: problemsSolved.length,
    difficultyProgress: [
      { difficulty: "Easy", solved: easyDone, total: easyCount },
      { difficulty: "Medium", solved: midDone, total: mediumCount },
      { difficulty: "Hard", solved: hardDone, total: hardCount },
    ],
  };

  return problemSolvingData;
}

type SubmissionsData = {
  total: number;
  currentStreak: number;
  highestStreak: number;
  months: number;
  year: number;
  calendarData: {
    month: string;
    days: any[];
  }[];
};

export async function getSubmissionsData(): Promise<SubmissionsData> {
  const { user } = await getCurrentSession();
  const submissions = await prisma.submission.findMany({
    where: {
      userId: user?.id,
    },
    select:{
        updatedAt: true
    },
    orderBy : {
        updatedAt : "desc"
    }
  });

  const lastAcceptedSubmission  = await prisma.submission.findFirst({
    where: { status: "ACCEPTED", userId: user?.id },
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true }
  });

  const daysDiff = differenceInBusinessDays(
    new Date(),
    lastAcceptedSubmission?.updatedAt!
  );
  
  if(daysDiff > 1){
    await prisma.user.update({
        where:{
            id: user?.id
        },
        data:{
            currentStreak : 0
        }
    })
  }

  let Streaks = await prisma.user.findUnique({
    where:{
        id : user?.id
    },
    select:{
        currentStreak : true,
        maxStreak : true
    }
  });

  let calendarData : { month: string; days: number[] }[] = [
    // Simplified representation of activity data
    // In a real implementation, this would be a more detailed structure
    // with specific dates and activity counts
    { month: "Jan", days: Array(31).fill(0) },
    { month: "Feb", days: Array(29).fill(0) },
    { month: "Mar", days: Array(31).fill(0) },
    { month: "Apr", days: Array(30).fill(0) },
    { month: "May", days: Array(31).fill(0) },
    { month: "Jun", days: Array(30).fill(0) },
    { month: "Jul", days: Array(31).fill(0) },
    { month: "Aug", days: Array(31).fill(0) },
    { month: "Sep", days: Array(30).fill(0) },
    { month: "Oct", days: Array(31).fill(0) },
    { month: "Nov", days: Array(30).fill(0) },
    { month: "Dec", days: Array(31).fill(0) },
  ]

  for(let i = 0; i < submissions.length; i++){
    let submission = submissions[i];
    const month = getMonth(submission?.updatedAt!)
    const day = getDate(submission?.updatedAt!)
    
    if (calendarData[month]) {
      calendarData[month].days[day] = calendarData[month].days[day]! + 1;
    }
  }
  
  const submissionsData = {
    total: submissions.length,
    currentStreak: Streaks?.currentStreak as number,
    highestStreak: Streaks?.maxStreak as number,
    months: 12,
    year: getYear(new Date()),
    calendarData
  };
  return submissionsData;
}


type RecentSubmissions = {
  id: string;
  problemName: string;
  timeAgo: string;
}[]

export async function getRecentSubmissions() : Promise<RecentSubmissions> {
  const { user } = await getCurrentSession();

  const Submissions  = await prisma.submission.findMany({
    where: { status: "ACCEPTED", userId: user?.id },
    orderBy: { updatedAt: "desc" },
    include:{
      problem:true
    },
    take : 5
  });
  const recentSubmissions = Submissions.map((s , i) => {
      const ss = {
        id : s.id,
        problemName : s.problem.title,
        timeAgo : formatDistance(s.updatedAt, new Date(), { addSuffix: true })
      }
      return ss
    })


    return recentSubmissions
}
