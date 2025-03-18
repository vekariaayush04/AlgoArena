"use client";
import { format } from "date-fns";
import Image from "next/image";
import img from "@/public/Featured Card Image.svg";
import lightImg from "@/public/lightBgBanner.svg"
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
  const [status, setStatus] = useState<"completetd" | "not-completed" | null>(null);
  const { resolvedTheme} = useTheme()

  useEffect(() => {
    if(Date.now() < new Date(contest?.endDate!).getTime()){
      setStatus("not-completed")
    }else{
      setStatus("completetd")
    }
  }, []);

  return (
    <div className="flex justify-between bg-gradient-to-b from-[#F1F5F9] to-[#ffffff] dark:from-[#0F172A] dark:to-[#020817] rounded-md px-5 pt-5">
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-semibold pl-1">{contest?.name}</div>
        <div className="pl-1">
          {(status === "completetd" ? <Step variant="HARD">Ended</Step> : <Step variant="EASY">Active</Step>)}
        </div>
        <div className="text-content-secondary pl-1">
          {format(contest?.startDate!, "dd MMMM, yyyy, h:mm a (zzz)")}
        </div>
        <div className="pl-1 text-content-secondary text-xl">
          {`${registered} Registered`}
        </div>
      </div>
      <div className="pt-10 pr-16 hidden md:block">
      {resolvedTheme === "dark" ? <Image src={img} alt=""></Image> : <Image src={lightImg} alt=""></Image>}
      </div>
    </div>
  );
};

export default ContestSmallBanner;
