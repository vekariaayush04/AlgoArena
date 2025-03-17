import { getCurrentSession } from "@/app/session";
import NavBar from "@/components/NavBar";
import CodeEditor from "@/components/ProblemsPage/Editor";
import QuestionDescription from "@/components/QuestionDescription";
import { prisma } from "@repo/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; contestProblemId: string ; problemId: string; }>;
}) => {
  const { user } = await getCurrentSession();
  if (user === undefined || user === null) {
    redirect("/");
  }
  const p = await params;
  // console.log(p);

  const problem = await prisma.problem.findUnique({
    where: {
      id: p.problemId,
    },
    include: {
      defaultCode: true,
    },
  });
  const length = await prisma.submission.count({
    where: {
      problemId: p.problemId as string,
      contestId: p.id,
    },
  });
  const submissions = await prisma.submission.findMany({
    where: {
      problemId: p.problemId as string,
      status: "ACCEPTED",
      contestId: p.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  let code = problem?.defaultCode[0]?.code;
  let isDone = false;

  if (submissions.length > 0) {
    isDone = true;
    code = submissions[0]?.code;
  }

  return (
    <>
      <div className="h-screen bg-primary dark:bg-primary">
        <NavBar status="LoggedIn" />
        <div className=" bg-primary dark:bg-primary grid grid-cols-2 p-5 gap-20">
          <QuestionDescription
            isDone={isDone}
            p_id={p.problemId}
            problem={problem}
            submissions={length}
            c_id={p.id}
          />
          <div className="h-96 col-span-1">
            <CodeEditor
              code={code}
              id={p.problemId}
              userId={user!.id}
              c_id={p.id}
              isContest={true}
              c_p_id={p.contestProblemId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
