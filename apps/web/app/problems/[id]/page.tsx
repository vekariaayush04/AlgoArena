import NavBar from "@/components/NavBar";
import CodeEditor from "@/components/ProblemsPage/Editor";
import { prisma } from "@repo/db/prisma";
import React from "react";
import { getCurrentSession } from "@/app/session";
import QuestionDescription from "@/components/QuestionDescription";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { user } = await getCurrentSession();
  const p = await params;
  const problem = await prisma.problem.findUnique({
    where: {
      id: p.id,
    },
    include: {
      defaultCode: true,
    },
  });
  const length = await prisma.submission.count({
    where: {
      problemId: p.id as string,
    },
  });
  const submissions = await prisma.submission.findMany({
    where: {
      problemId: p.id as string,
      status: "ACCEPTED",
      userId : user?.id
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
        <div className=" bg-primary dark:bg-primary md:grid md:grid-cols-2 p-5 gap-20 flex flex-col gap-10">
          <QuestionDescription
            isDone={isDone}
            p_id={p.id}
            problem={problem}
            submissions={length}
          />
          <div className="h-96 col-span-1">
            <CodeEditor code={code} id={p.id} userId={user!.id} />
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default page;
