import { getCurrentSession } from "@/app/session";
import NavBar from "@/components/NavBar";
import CodeEditor from "@/components/ProblemsPage/Editor";
import { ProblemComponent } from "@/components/ProblemsPage/ProblemDesc";
import Submissions from "@/components/ProblemsPage/Submissions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { prisma } from "@repo/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; contestId: string , contestProblemId : string }>;
}) => {
  const { user } = await getCurrentSession();
  if (user === undefined || user === null) {
      redirect("/");
    }
  const p = await params;
  console.log(p);
  
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
      contestId : p.contestId
    },
  });
  const submissions = await prisma.submission.findMany({
    where: {
      problemId: p.id as string,
      status: "ACCEPTED",
      contestId : p.contestId
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
          <Tabs defaultValue="problem">
            <TabsList className="grid w-full grid-cols-2 text-content-primary bg-primary pb-5">
              <TabsTrigger
                value="problem"
                className="data-[state=active]:bg-border data-[state=active]:dark:bg-border data-[state=active]:text-content-primary rounded p-1"
              >
                Problem
              </TabsTrigger>
              <TabsTrigger
                value="submissions"
                className="data-[state=active]:bg-border data-[state=active]:dark:bg-border data-[state=active]:text-content-primary "
              >
                Submissions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="problem" className="">
              <div className="">
                <ProblemComponent
                  problem={problem}
                  isDone={isDone}
                  submissions={length}
                />
              </div>
            </TabsContent>
            <TabsContent value="submissions">
              <div className="">
                <Submissions p_id={p.id} c_id={p.contestId}/>
              </div>
            </TabsContent>
          </Tabs>

          <div className="h-96 col-span-1">
            <CodeEditor code={code} id={p.id} userId={user!.id} c_id={p.contestId} isContest={true} c_p_id={p.contestProblemId}/>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </>
  );
};

export default page;
