"use client";
import ContestTimer, { Status } from "./ContestTimer";
import { format } from "date-fns";
import { Button } from "../ui/button";
import Image from "next/image";
import img from "@/public/Featured Card Image.svg";
import lightImg from "@/public/lightBgBanner.svg"
import { ContestVisibility } from "@repo/db/prisma";
import { registerUser, unregisterUser } from "@/app/actions/ContestActions";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isFuture,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export type Contest = {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  duration: number;
  visibility: ContestVisibility;
} | null;


export type ContestBannerProps = {
  contest: Contest;
  registered: number;
  userId: string;
  isRegistered: boolean;
};
const ContestBanner: React.FC<ContestBannerProps> = ({
  contest,
  registered,
  userId,
  isRegistered,
}) => {
  const { resolvedTheme} = useTheme()
  const [status, setStatus] = useState<Status>(null);
  const [d, setD] = useState(0);
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  const [s, setS] = useState(0);
  const router = useRouter();

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
    <div className="flex justify-between bg-gradient-to-b from-[#F1F5F9] to-[#ffffff] dark:from-[#0F172A] dark:to-[#020817] rounded-md p-5">
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-semibold pl-2">{contest?.name}</div>
        <div>
          <ContestTimer status={status} s={s} m={m} h={h} d={d} />
        </div>
        <div className="text-content-secondary pl-2">
          {format(contest?.startDate!, "dd MMMM, yyyy, h:mm a (zzz)")}
        </div>
        <div className="pl-2 text-content-secondary text-xl">
          {`${registered} Registered`}
        </div>


        {status === "Not-Started" && (<div className="pl-2">
          {!isRegistered ? (
            <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await registerUser(userId, contest?.id!);
                // console.log(res.message);

                toast(res.message, { autoClose: 2500 });
                setTimeout(() => {
                  router.refresh();
                }, 2700);
              }}
            >
              <Button
                variant={"blue"}
                type="submit"
                className="hover:cursor-pointer"
              >
                Register Now
              </Button>

              <ToastContainer />
            </form>
          ) : (
            <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await unregisterUser(userId, contest?.id!);
                // console.log(res.message);
                toast(res.message, { autoClose: 2500 });
                setTimeout(() => {
                  router.refresh();
                }, 2700);
              }}
            >
              <Button
                variant={"default"}
                type="submit"
                className="bg-red-500 text-md text-white hover:bg-red-600 hover:cursor-pointer"
              >
                UnRegister
              </Button>

              <ToastContainer />
            </form>
          )}
        </div>)}

        {status === "Started" && (<div className="pl-2">
          {!isRegistered ? (
            <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await registerUser(userId, contest?.id!);
                // console.log(res.message);

                toast(res.message, { autoClose: 2500 });
                setTimeout(() => {
                  router.refresh();
                }, 2700);
              }}
            >
              <Button
                variant={"blue"}
                type="submit"
                className="hover:cursor-pointer"
              >
                Register Now
              </Button>

              <ToastContainer />
            </form>
          ) : (
            <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault();
                router.push(`/contests/${contest?.id}`)
              }}
            >
              <Button
                variant={"blue"}
                type="submit"
                className=""

              >
                Join Now
              </Button>

              <ToastContainer />
            </form>
          )}
        </div>)}

        {status === "Completed" && (<div className="pl-2">
          <form
              action=""
              onSubmit={async (e) => {
                e.preventDefault();
                router.push(`/contests/${contest?.id}`)
              }}
            >
              <Button
                variant={"blue"}
                type="submit"
                className=""

              >
                View Details
              </Button>

              <ToastContainer />
            </form>
        </div>)}


      </div>
      <div className="pt-10 pr-16 md:block hidden">
        {resolvedTheme === "dark" ? <Image src={img} alt=""></Image> : <Image src={lightImg} alt=""></Image>}
      </div>
    </div>
  );
};

export default ContestBanner;

