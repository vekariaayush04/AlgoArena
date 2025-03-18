"use client"
import React from "react";
import HeroImages from "./HeroImages";
import { ArrowRight } from "lucide-react";
import HowItWorks from "./HowItWorks";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter()
  return (
    <div className="bg-primary dark:bg-primary flex flex-col gap-2">
      <div className="bg-primary dark:bg-primary flex justify-center items-center md:pt-32 pt-16 flex-col gap-5 pb-16">
        <div className="flex flex-col gap-8">
          <div className="md:text-6xl text-5xl font-bold text-center flex flex-col gap-3 px-4">
            <div className="text-content-primary">Conquer the Code at</div>
            <div className="text-blue-700">Algorithmic Arena</div>
          </div>
          <div className="text-[#94A3B8] font-semibold text-center text-sm px-5 md:p-0">
            Join elite coders, solve problems, and climb leaderboards at
            Algorithmic Arena.
          </div>
          <div className="md:flex-row flex flex-col justify-center gap-6 mb-6 px-5">
            <Button variant={"blue"} onClick={() => router.push("/login")}>Start Solving</Button>
            <Button variant={"primary"} onClick={() => router.push("/login")}>
              Explore new features{" "}
              <ArrowRight className="w-6 h-6 text-gray-500" />
            </Button>
          </div>
        </div>
        <HeroImages />
      </div>
      <HowItWorks />
    </div>
  );
};

export default Hero;
