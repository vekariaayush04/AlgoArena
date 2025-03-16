import NavBar from "@/components/NavBar";
import React from "react";
import { prisma, STATUS } from "@repo/db/prisma";
import ProblemPage from "@/components/ProblemsPage/ProblemPage";
import { getCurrentSession } from "../session";
import { redirect } from "next/navigation";

export type Problem = {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  createdAt: Date;
  updatedAt: Date;
  status?: "completed" | "attempted" | "not-started";
};

type Submission = {
  code: string;
  time: number | null;
  id: string;
  status: STATUS;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  fullCode: string;
  memory: number | null;
  problemId: string;
  languageId: number;
};

const page = async () => {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/");
  }
  const problems = await prisma.problem.findMany();
  const userWithSubmissions = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      submissions: true,
    },
  });

  // Get user submissions if available
  const submissions: Submission[] = userWithSubmissions?.submissions || [];

  // Process problems to add status
  const problemsWithStatus: Problem[] = problems.map((problem) => {
    // Find all submissions for this problem
    const problemSubmissions = submissions.filter(
      (sub) => sub.problemId === problem.id
    );

    let status: "completed" | "attempted" | "not-started" = "not-started";

    // Check if any submission was accepted
    if (problemSubmissions.some((sub) => sub.status === "ACCEPTED")) {
      status = "completed";
    }
    // Check if there were attempts but none accepted
    else if (problemSubmissions.length > 0) {
      status = "attempted";
    }

    // Return problem with added status
    return {
      ...problem,
      status,
    };
  });

  return (
    <div className="min-h-screen bg-primary dark:bg-primary">
      <NavBar status="LoggedIn" />
      <ProblemPage problems={problemsWithStatus} />
    </div>
  );
};

export default page;
