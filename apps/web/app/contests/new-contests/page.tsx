import { getCurrentSession } from "@/app/session";
import CreateContestForm from "@/components/ContestPage/CreateContestForm";
import NavBar from "@/components/NavBar";
import { prisma } from "@repo/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { user } = await getCurrentSession();
  if (user === undefined || user === null || user.role === "USER") {
    redirect("/");
  }
  const problems = await prisma.problem.findMany({});

  return (
    <div className="bg-primary h-screen">
      <NavBar status="LoggedIn" />
      <div className="flex flex-col gap-4 px-20 py-8">
        <div></div>
        <div className="text-3xl font-semibold text-content-primary">
          Create New Contest
        </div>
        <div>
          <CreateContestForm problems={problems} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
