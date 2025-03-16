import { getCurrentSession } from "@/app/session";
import ContestProblemsDisplay, { ContestProblem } from "@/components/ContestPage/ContestProblemDisplay";
import NavBar from "@/components/NavBar";
import { prisma } from "@repo/db/prisma";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const param = await params;
  const { user } = await getCurrentSession();
  if (user === undefined) {
    redirect("/");
  }

  const participations = await prisma.contestParticipation.findMany({
    where: {
      userId: user?.id,
    },
  });

  const isRegistered = participations.reduce(
    (acc, p) => (p.contestId === param.id ? true : acc),
    false
  );

  const problems = await prisma.contestProblem.findMany({
    where: {
      contestId: param.id,
    },
    include : {
      problem : true
    }
  });

  const submissions = await prisma.submission.findMany({
    where: {
      userId: user?.id,
      contestId : param.id
    }
  });
  // console.log(submissions);
  
  // Get user submissions if available
  //const submissions: Submission[] = userWithSubmissions?.submissions || [];

  // Process problems to add status
  const problemsWithStatus: ContestProblem[] = problems.map((problem) => {
    // Find all submissions for this problem
    const problemSubmissions = submissions.filter(
      (sub) => sub.problemId === problem.problem.id
    );
    console.log(problemSubmissions);
    
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
      name : problem.problem.title
    };
  });

  if (!isRegistered) {
    redirect("/contests");
  }

  return (
    <div className="">
      <NavBar status="LoggedIn" />
      <ContestProblemsDisplay problems={problemsWithStatus}></ContestProblemsDisplay>
    </div>
  );
};

export default Page;
