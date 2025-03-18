import React from "react";
import StepBox from "./StepBox";

const HowItWorks = () => {
  return (
    <div className="md:py-28 py-20 bg-gradient-to-b from-[#F1F5F9] to-[#ffffff] dark:from-[#0F172A] dark:to-[#020817] rounded-t-md flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="text-5xl text-content-primary font-semibold">
          How It <span className="text-[#4E7AFF]">Works</span>
        </div>
        <div className="font-semibold text-md text-[#94A3B8] text-center">
          <div>
            Follow these simple steps to get started, compete in challenges, and
            track your
          </div>
          <div>progress on Algorithmic Arena.</div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 flex flex-col gap-10 px-5 pt-8 max-w-5xl">
        <StepBox
          num={1}
          desc="Create your account by signing up with your email, Google, or GitHub. If you're already a member, simply log in to access your profile and start coding right away."
          title="Sign Up or Log In"
        />
        <StepBox
          num={2}
          title="Choose a Problem"
          desc="Explore our regularly scheduled coding contests and select one that fits your skill level or interests. Alternatively, dive into our extensive problem library to tackle challenges at your own pace."
        />
        <StepBox
          num={3}
          title="Start Coding"
          desc="Use our interactive coding environment to write, test, and submit your solutions directly on the platform. Receive instant feedback to refine your approach."
        />
        <StepBox
          num={4}
          title="Track Your Progress"
          desc="Monitor your ranking on real-time leaderboards and analyze your performance with detailed analytics. This insight helps you understand your strengths and pinpoint areas for improvement."
        />
      </div>
    </div>
  );
};

export default HowItWorks;
