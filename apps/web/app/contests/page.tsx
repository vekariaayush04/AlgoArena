import NavBar from "@/components/NavBar";
import React from "react";
import { getCurrentSession } from "../session";
import { prisma } from "@repo/db/prisma";
import ContestBanner, {
  ContestBannerProps,
} from "@/components/ContestPage/ContestBanner";


const page = async () => {
  const { user } = await getCurrentSession();

  const contest = await prisma.contest.findMany({
    orderBy: {
      startDate: "desc",
    },
  });

  const contestData = await Promise.all(
    contest.map(async (c) => {
      const registered = await prisma.contestParticipation.count({
        where: {
          contestId: c?.id,
        },
      });

      const participations = await prisma.contestParticipation.findMany({
        where:{
          userId : user?.id
        }
      })

      const isRegistered = participations.reduce((acc,p) => p.contestId === c.id ? true : acc , false)
      
      return {
        contest: c,
        registered,
        isRegistered
      };
    })
  );

  return (
    <div>
      <NavBar status={user === undefined ? "LoggedOut" : "LoggedIn"} />
      <div className="flex flex-col gap-5 px-20 py-8">
        <div className="flex flex-col gap-2">
          <div className="text-content-primary text-4xl font-semibold">
            Contests
          </div>
          <div className="text-content-secondary font-semibold">
            Test your skills, face top coders, and ascend the leaderboards at
            Algorithmic Arena.
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-content-primary text-2xl font-semibold">
            Featured Contest
          </div>
          <div className="flex flex-col gap-3">
          {contestData.map((c, i) => (
            <ContestBanner
              key={i}
              contest={c.contest}
              registered={c.registered}
              userId={user?.id!}
              isRegistered={c.isRegistered}
            ></ContestBanner>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
