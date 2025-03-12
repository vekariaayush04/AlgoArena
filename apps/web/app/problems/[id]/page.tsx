import NavBar from "@/components/NavBar";
import CodeEditor from "@/components/ProblemsPage/Editor";
import { ProblemComponent } from "@/components/ProblemsPage/ProblemDesc";
import { Button } from "@/components/ui/button";
import { prisma } from "@repo/db/prisma";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import Submissions from "@/components/ProblemsPage/Submissions";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const p = await params;
  const problem = await prisma.problem.findUnique({
    where: {
      id: p.id,
    },
    include: {
      defaultCode: true,
    },
  });
  const submissions = await prisma.submission.findMany({
    where : {
      problemId: p.id as string
    }
  })
  
  const isDone = submissions.reduce((acc , curr) => curr.status === "ACCEPTED" ? true : acc , false)
  console.log(isDone);
  
  return (
    <>
      <div className="h-screen bg-primary dark:bg-primary">
        <NavBar status="LoggedIn" />
        <div className=" bg-primary dark:bg-primary grid grid-cols-2 p-5 gap-20">
          <Tabs defaultValue="submissions" >
            <TabsList className="grid w-full grid-cols-2 bg-[#0F172A] text-[#94A3B8]">
              <TabsTrigger value="problem" className="data-[state=active]:bg-border data-[state=active]:dark:bg-border data-[state=active]:text-[#F8FAFC]">Problem</TabsTrigger>
              <TabsTrigger value="submissions" className="data-[state=active]:text-[#F8FAFC] data-[state=active]:bg-border data-[state=active]:dark:bg-border">Submissions</TabsTrigger>
            </TabsList>
            <TabsContent value="problem" className="">
                <div className="">
                  <ProblemComponent problem={problem} isDone={isDone} submissions={submissions.length}/>
                </div>
              </TabsContent>
              <TabsContent value="submissions">
                <div className="">
                  <Submissions/>
                </div>
              </TabsContent>
          </Tabs>

          <div className="h-96 col-span-1">
            <CodeEditor code={problem?.defaultCode[0]?.code} id={p.id} />
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default page;
