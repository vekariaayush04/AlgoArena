"use client";
import { Status } from "./ContestTimer";
import { format } from "date-fns";
import Image from "next/image";
import img from "@/public/Featured Card Image.svg";
import lightImg from "@/public/lightBgBanner.svg"
import { useRouter } from "next/navigation";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isFuture,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { Contest } from "./ContestBanner";
import { Step } from "../LandingPage/StepBox";
import { useTheme } from "next-themes";

export type ContestSmallBannerProps = {
  contest: Contest;
  registered: number;
};

const ContestSmallBanner: React.FC<ContestSmallBannerProps> = ({
  contest,
  registered,
}) => {
  const [status, setStatus] = useState<Status>(null);
  const [d, setD] = useState(0);
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);
  const router = useRouter();
  const { resolvedTheme} = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFuture(contest?.startDate!)) {
        setStatus("Not-Started");
        let d1 = new Date();
        setD(differenceInDays(contest?.startDate!, d1));
        setH(differenceInHours(contest?.startDate!, d1) % 24);
        setM(differenceInMinutes(contest?.startDate!, d1) % 60);
        setS(differenceInSeconds(contest?.startDate!, d1) % 60);
      } else if (isFuture(contest?.endDate!)) {
        setStatus("Started");
        let d1 = new Date();
        setD(differenceInDays(contest?.endDate!, d1));
        setH(differenceInHours(contest?.endDate!, d1) % 24);
        setM(differenceInMinutes(contest?.endDate!, d1) % 60);
        setS(differenceInSeconds(contest?.endDate!, d1) % 60);
      } else {
        setStatus("Completed");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="flex justify-between bg-gradient-to-b from-[#F1F5F9] to-[#ffffff] dark:from-[#0F172A] dark:to-[#020817] rounded-md px-5 pt-5">
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-semibold pl-1">{contest?.name}</div>
        <div className="pl-1">
          {status === "Started" && (<Step variant="EASY">Active</Step>)}
        </div>
        <div className="text-content-secondary pl-1">
          {format(contest?.startDate!, "dd MMMM, yyyy, h:mm a (zzz)")}
        </div>
        <div className="pl-1 text-content-secondary text-xl">
          {`${registered} Registered`}
        </div>
      </div>
      <div className="pt-10 pr-16">
      {resolvedTheme === "dark" ? <Image src={img} alt=""></Image> : <Image src={lightImg} alt=""></Image>}
      </div>
    </div>
  );
};

export default ContestSmallBanner;
