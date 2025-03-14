import NavBar from "@/components/NavBar";
import CodeEditor from "@/components/ProblemsPage/Editor";
import { ProblemComponent } from "@/components/ProblemsPage/ProblemDesc";
import { prisma } from "@repo/db/prisma";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Submissions from "@/components/ProblemsPage/Submissions";
import { getCurrentSession } from "@/app/session";

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
    where:{
      problemId : p.id as string
    }
  })
  const submissions = await prisma.submission.findMany({
    where: {
      problemId: p.id as string,
      status : "ACCEPTED"
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  
  let code = problem?.defaultCode[0]?.code;
  let isDone = false;

  if (submissions.length > 0) {
    isDone = true
    code = submissions[0]?.code;
  }

  return (
    <>
      <div className="h-screen bg-primary dark:bg-primary">
        <NavBar status="LoggedIn" />
        <div className=" bg-primary dark:bg-primary grid grid-cols-2 p-5 gap-20">
          <Tabs defaultValue="problem">
            <TabsList className="grid w-full grid-cols-2 text-content-primary bg-primary">
              <TabsTrigger
                value="problem"
                className="data-[state=active]:bg-border data-[state=active]:dark:bg-border data-[state=active]:text-content-primary"
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
                <Submissions p_id={p.id} />
              </div>
            </TabsContent>
          </Tabs>

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
