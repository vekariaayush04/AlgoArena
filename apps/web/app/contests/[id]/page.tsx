import { getCurrentSession } from "@/app/session";
import ContestDetails from "@/components/ContestPage/ContestDetails";
import ContestProblemsDisplay, {
  ContestProblem,
} from "@/components/ContestPage/ContestProblemDisplay";
import ContestSmallBanner from "@/components/ContestPage/ContestSmallBanner";
import NavBar from "@/components/NavBar";
import { prisma } from "@repo/db/prisma";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const param = await params;
  const { user } = await getCurrentSession();
  if (user === undefined || user === null) {
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
    include: {
      problem: true,
    },
  });

  const submissions = await prisma.submission.findMany({
    where: {
      userId: user?.id,
      contestId: param.id,
    },
  });

  const problemsWithStatus: ContestProblem[] = problems.map((problem) => {
    const problemSubmissions = submissions.filter(
      (sub) => sub.problemId === problem.problem.id
    );
    // console.log(problemSubmissions);

    let status: "completed" | "attempted" | "not-started" = "not-started";

    if (problemSubmissions.some((sub) => sub.status === "ACCEPTED")) {
      status = "completed";
    } else if (problemSubmissions.length > 0) {
      status = "attempted";
    }
    return {
      ...problem,
      status,
      name: problem.problem.title,
    };
  });

  const c = await prisma.contest.findUnique({
    where: {
      id: param.id,
    },
  });

  const registered = await prisma.contestParticipation.count({
    where: {
      contestId: param.id,
    },
  });

  
  if (!isRegistered && (Date.now() < new Date(c?.endDate!).getTime())) {
    redirect("/contests");
  }

  return (
    <div className="">
      <NavBar status="LoggedIn" />
      <div className="flex flex-col md:px-24 px-8 py-10 gap-5">
        <ContestSmallBanner
          contest={c}
          registered={registered}
        ></ContestSmallBanner>
        <ContestDetails
          totalProblems={problems.length}
          duration={c?.duration!}
          StartDate={c?.startDate!}
        ></ContestDetails>
        <div className="md:grid md:grid-cols-10">
          <div className="col-span-7">
            <ContestProblemsDisplay
              problems={problemsWithStatus}
              toDisplay={Date.now() < new Date(c?.endDate!).getTime()}
            ></ContestProblemsDisplay>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
