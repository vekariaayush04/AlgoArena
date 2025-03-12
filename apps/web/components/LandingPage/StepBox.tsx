import React from "react";

const StepBox = ({
  num,
  desc,
  title,
}: {
  num: number;
  desc: string;
  title: string;
}) => {
  return (
    <div className="col-span-1 flex flex-col gap-3 bg-[#64748B1A] rounded-xl p-5 font-semibold">
      <div>
        <Step data={`Step ${num}`}></Step>
      </div>
      <div className="text-content-primary text-xl p-1">{title}</div>
      <div className="text-[#94A3B8]">{desc}</div>
    </div>
  );
};

import { ReactNode } from 'react';

export const Step = ({ 
  data, 
  variant = "NORMAL",
  children
}: { 
  data?: string;
  variant?: "EASY" | "NORMAL" | "MEDIUM" | "HARD";
  children?: ReactNode;
}) => {
  const colors = {
    "EASY": "bg-[#22C55E1A] text-[#3D9C5C]",
    "NORMAL": "bg-[#3B82F61A] text-[#4E7AFF]",
            "MEDIUM": "bg-[#EA580C1A] text-[#FB923C]",
        "HARD": "bg-[#DC26261A] text-[#DD503F]"
  };
  
  return (
    <span className={`${colors[variant]} p-1.5 rounded-xl px-3`}>
      {children || data}
    </span>
  );
};

export default StepBox;
