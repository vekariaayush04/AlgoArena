"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "@/public/logoAlgo.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/useUser";
import Link from "next/link";
import ThemeToggleButton from "@/app/ThemeSwitcher";

const NavBar = ({ status }: { status: "LoggedIn" | "LoggedOut" }) => {
  const router = useRouter();
  return (
    <div className="sticky top-0 left-0 right-0 flex justify-between bg-primary dark:bg-primary text-gray-200 border-b border-border dark:border-border p-2">
      <div className="flex pl-4 gap-3 items-center justify-center">
        <Image src={logo} alt="" width={40} height={40} />
        <div className="font-semibold">
          <div className="text-content-primary">Algorithmic</div>
          <div className="text-blue-800">arena</div>
        </div>
      </div>
      <div className=" gap-6 flex justify-center items-center">
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
            variant={"primary"}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              variant={"blue"}
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

// function ThemeToggleButton() {
//   return (
//     <button className="p-2 border border-[#1E293B] rounded-lg dark:bg-gray-900 h-full">
//       <Sun className="h-6 w-6 block dark:hidden text-[#94A3B8]" />
//       <Moon className="h-6 w-6 hidden dark:block text-[#94A3B8]" />
//     </button>
//   );
// }
