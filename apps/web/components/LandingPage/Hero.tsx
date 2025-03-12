import React from "react";
import HeroImages from "./HeroImages";
import { ArrowRight } from "lucide-react";
import HowItWorks from "./HowItWorks";
import { PrimaryButton } from "../Buttons/buttons";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="bg-primary dark:bg-primary">
      <div className="bg-primary dark:bg-primary h-full flex justify-center items-center pt-32 flex-col gap-5 pb-16">
        <div className="flex flex-col gap-8">
          <div className="text-6xl font-bold text-center flex flex-col gap-3">
            <div className="text-content-primary">Conquer the Code at</div>
            <div className="text-blue-700">Algorithmic Arena</div>
          </div>
          <div className="text-[#94A3B8] font-semibold text-center text-sm">
            Join elite coders, solve problems, and climb leaderboards at
            Algorithmic Arena.
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <Button variant={"blue"}>Start Solving</Button>
            <Button variant={"primary"}>
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
