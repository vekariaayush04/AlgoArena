"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "@/public/logoAlgo.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/useUser";
import Link from "next/link";

const NavBar = ({ status }: { status: "LoggedIn" | "LoggedOut" }) => {
  const router = useRouter();
  return (
    <div className="sticky top-0 left-0 right-0 flex justify-between bg-[#020817] text-gray-200 border-b border-[#1E293B]">
      <div className="flex m-3 gap-3 items-center justify-center">
        <Image src={logo} alt="" width={50} height={50} />
        <div className="font-semibold">
          <div>Algorithmic</div>
          <div className="text-blue-800">arena</div>
        </div>
      </div>
      <div className="m-4 gap-6 flex justify-center items-center">
        {status === "LoggedIn" && (
          <div className="flex gap-6 text-[#94A3B8] text-md font-semibold">
            <Link href="/problems"> Problems</Link>
            <Link href="#"> Contests</Link>
            <Link href="#"> LeaderBoard</Link>
          </div>
        )}
        <ThemeToggleButton></ThemeToggleButton>
        {status === "LoggedOut" && (
          <div className="flex gap-2">
            <Button
              className="bg-[#020817] border border-[#1E293B] text-[#94A3B8] text-md"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-[#3259E8] text-white text-md"
              onClick={() => router.push("/signup")}
            >
              Sign up now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

function ThemeToggleButton() {
  return (
    <button className="p-2 border border-[#1E293B] rounded-lg dark:bg-gray-900 h-full">
      <Sun className="h-6 w-6 block dark:hidden text-[#94A3B8]" />
      <Moon className="h-6 w-6 hidden dark:block text-[#94A3B8]" />
    </button>
  );
}
