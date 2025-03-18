"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/logoAlgo.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/useUser";
import Link from "next/link";
import ThemeToggleButton from "@/app/ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/logout/actions";

const NavBar = ({ status }: { status: "LoggedIn" | "LoggedOut" }) => {
  const router = useRouter();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined && user !== null) {
      setLoading(false);
    }
  }, [loading, user]);
  return (
    <div className="sticky top-0 left-0 right-0 flex justify-between bg-primary dark:bg-primary text-gray-200 border-b border-border dark:border-border p-2 z-10">
      <div className="flex pl-4 gap-3 items-center justify-center">
        <Image src={logo} alt="" width={40} height={40} />
        <div className="font-semibold">
          <div className="text-content-primary">Algorithmic</div>
          <div className="text-blue-800">arena</div>
        </div>
      </div>
      <div className=" gap-6 flex justify-center items-center">
        {status === "LoggedIn" && (
          <div className="flex gap-6 text-[#94A3B8] text-md font-semibold items-center">
            <div className="hidden  md:flex md:gap-6"><Link href="/problems"> Problems</Link>
            <Link href="/contests"> Contests</Link></div>
            {/* <Link href="#"> LeaderBoard</Link> */}
            {!loading && (
              <div >
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-secondary rounded-full p-1">
                    {" "}
                    <Image
                      src={user?.image!}
                      alt=""
                      width={35}
                      height={35}
                      className="rounded-full border-2"
                    ></Image>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{router.push("/profile")}}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={async () => {
                        await logout()
                    }}>logout</DropdownMenuItem>
                    <div className="md:hidden block">
                    <DropdownMenuItem onClick={()=>{router.push("/problems")}}>Problems</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{router.push("/contests")}}>Contests</DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        )}
        <ThemeToggleButton></ThemeToggleButton>
        {status === "LoggedOut" && (
          <div className="flex gap-2">
            <Button variant={"primary"} onClick={() => router.push("/login")} className="hidden md:block">
              Login
            </Button>
            <Button variant={"blue"} onClick={() => router.push("/login")}>
              Join now
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
