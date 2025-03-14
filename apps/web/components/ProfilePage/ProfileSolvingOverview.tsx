"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface DifficultyProgress {
  difficulty: string;
  solved: number;
  total: number;
}

interface ProblemSolvingOverviewProps {
  solved: number;
  difficultyProgress: DifficultyProgress[];
}

const ProblemSolvingOverview: React.FC<ProblemSolvingOverviewProps> = ({
  solved,
  difficultyProgress,
}) => {

  return (
    <div className="border-2 border-border rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Problem-Solving Overview</h2>

      <div className="grid grid-cols-2">
      <MultiCircularProgress
        difficultProgress={difficultyProgress}
        size={200}
        solved={solved}
      ></MultiCircularProgress>
      <div className="col-span-1 flex flex-col justify-between">
        <div className="w-full flex flex-col items-center justify-center bg-secondary rounded-lg p-1">
            <div className="text-green-600">Easy</div>
            <div>{`${difficultyProgress[0]?.solved}/${difficultyProgress[0]?.total}`}</div>
        </div>
        <div className="w-full flex flex-col items-center justify-center bg-secondary  rounded-lg p-1">
            <div className="text-[#FB923C]">Medium</div>
            <div>{`${difficultyProgress[1]?.solved}/${difficultyProgress[1]?.total}`}</div>
        </div>
        <div className="w-full flex flex-col items-center justify-center bg-secondary  rounded-lg p-1">
            <div className="text-red-600">Hard</div>
            <div>{`${difficultyProgress[2]?.solved}/${difficultyProgress[2]?.total}`}</div>
        </div>
      </div>
      </div>


    </div>
  );
};

export default ProblemSolvingOverview;

const CircularProgressBar = ({
  percentage = 50,
  size = 100,
  strokeWidth = 10,
  color = "#EF4444",
}) => {
  const {resolvedTheme} = useTheme()
  const [offset, setOffset] = useState(0);
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <svg width={size} height={size} className="absolute transform -rotate-90 z-0">
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={resolvedTheme === "dark" ? "#0F172A" : "#F1F5F9"}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={"bg-secondary"}
      />
    </svg>
  );
};

const MultiCircularProgress = ({
  size,
  difficultProgress,
  solved,
}: {
  size: number;
  difficultProgress: DifficultyProgress[];
  solved: number;
}) => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <CircularProgressBar
        percentage={getPercentage(difficultProgress[2]!)}
        size={size}
        strokeWidth={10}
        color="#EF4444"
      />
      <CircularProgressBar
        percentage={getPercentage(difficultProgress[1]!)}
        size={size * 0.8}
        strokeWidth={10}
        color="#FBBF24"
      />
      <CircularProgressBar
        percentage={getPercentage(difficultProgress[0]!)}
        size={size * 0.6}
        strokeWidth={10}
        color="#10B981"
      />
      <span className="absolute text-lg font-bold text-content-primary flex flex-col justify-center items-center">
        {solved} <span className="text-sm font-medium">Solved</span>
      </span>
    </div>
  );
};

// export default CircularProgressBar;

const getPercentage = (progress: DifficultyProgress) => {
  return (progress.solved / progress.total) * 100;
};
