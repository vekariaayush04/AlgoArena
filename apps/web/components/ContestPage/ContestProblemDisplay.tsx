"use client";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Search,
  CircleCheckBig,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Step } from "../LandingPage/StepBox";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

// Define the Problem type to match what you're getting from the database
export type ContestProblem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  contestId: string;
  points: number;
  problemId: string;
  displayOrder: number;
  status?: "completed" | "attempted" | "not-started";
  name: string;
};

export default function ProblemsDisplay({
  problems,
  toDisplay,
}: {
  problems: ContestProblem[];
  toDisplay: boolean;
}) {
  const router = useRouter();
  // console.log(problems);

  return (
    <div className="pt-4">
      <div className="md:max-w-4xl">
        <div className="rounded-md border-2 border-border overflow-hidden">
          <Table className="border-collapse">
            <TableHeader className="bg-secondary">
              <TableRow className=" hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">
                  Problem
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Points
                </TableHead>
                <TableHead className="text-gray-400 font-medium text-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem) => (
                <TableRow
                  key={problem.id}
                  
                  className="hover:bg-primary border-y-2 cursor-pointer"
                  onClick={() => {
                    toDisplay ? router.push(
                      `/contests/${problem.contestId}/${problem.id}/${problem.problemId}`
                    ) : toast.error("Contest is Ended")
                  }}
                >
                  <TableCell className="font-medium text-content-secondary p-3 ">
                    {problem.name}
                  </TableCell>
                  <TableCell>
                    <Step data={`${problem.points} Pts`}></Step>
                  </TableCell>
                  <TableCell className="text-center">
                    {problem.status === "completed" && (
                      <CircleCheckBig className="w-4 h-4 text-green-500 mx-auto" />
                    )}
                    {problem.status === "attempted" && (
                      <HelpCircle className="w-4 h-4 text-orange-500 mx-auto" />
                    )}
                    {(!problem.status || problem.status === "not-started") && (
                      <span className="text-gray-500">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
}
