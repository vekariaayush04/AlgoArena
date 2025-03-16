"use client";

import { Step } from "../LandingPage/StepBox";


export type Status = "Started" | "Not-Started" | "Completed" | null;

const ContestTimer = ({
  status,
  s,
  d,
  h,
  m,
}: {
  status: Status;
  s: number;
  d: number;
  m: number;
  h: number;
}) => {
  if (status === "Not-Started") {
    return (
      <Step>{`Starts in ${d < 10 ? `0${d}` : d}d : ${h < 10 ? `0${h}` : h}hr : ${m < 10 ? `0${m}` : m}m : ${s < 10 ? `0${s}` : s}s`}</Step>
    );
  } else if (status === "Started") {
    return (
      <Step>{`Ends in ${d < 10 ? `0${d}` : d}d : ${h < 10 ? `0${h}` : h}hr : ${m < 10 ? `0${m}` : m}m : ${s < 10 ? `0${s}` : s}s`}</Step>
    );
  } else {
    return <Step>{`Completed`}</Step>;
  }
};

export default ContestTimer;
