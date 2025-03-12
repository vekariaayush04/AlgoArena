"use client";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "../useUser";

const page = () => {
  const user = useUser();
  const router = useRouter();
  return (
    <div>
      <NavBar status={user === undefined ? "LoggedOut" : "LoggedIn"} />
      <div className="flex justify-center items-center h-96 mt-24 flex-col gap-8">
        <div className=" text-5xl font-bold">Coming Soon !!</div>
        <Button variant={"blue"} onClick={() => router.push("/problems")}>
          Go to Problems
        </Button>
      </div>
    </div>
  );
};

export default page;
