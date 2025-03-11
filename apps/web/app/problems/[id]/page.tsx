import NavBar from "@/components/NavBar";
import CodeEditor from "@/components/ProblemsPage/Editor";
import { ProblemComponent } from "@/components/ProblemsPage/ProblemDesc";
import { Button } from "@/components/ui/button";
import { prisma } from "@repo/db/prisma";
import React from "react";

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

  return (
    <>
      <div className="h-screen bg-[#020817]">
        <NavBar status="LoggedIn" />
        <div className=" bg-[#020817] grid grid-cols-2 p-5 gap-20 mt-16">
          <div className="col-span-1">
            <ProblemComponent problem={problem} />
          </div>
          <div className="h-96 col-span-1">
            <CodeEditor code={problem?.defaultCode[0]?.code} id={p.id}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
