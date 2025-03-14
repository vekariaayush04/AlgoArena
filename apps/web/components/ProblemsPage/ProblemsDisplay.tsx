"use client"
import { Check, ChevronDown, ChevronLeft, ChevronRight, HelpCircle, Search , CircleCheckBig } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Step } from "../LandingPage/StepBox"
import { Problem } from "@/app/problems/page"
import { useRouter } from "next/navigation"

// Define the Problem type to match what you're getting from the database


export default function ProblemsDisplay({problems} : {problems : Problem[]}) {
  const router = useRouter()
  return (
    <div className="pt-4">
      <div className="max-w-9xl">
        {/* Header with filters */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-white"
              >
                Difficulty <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Easy</DropdownMenuItem>
              <DropdownMenuItem>Medium</DropdownMenuItem>
              <DropdownMenuItem>Hard</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-white"
              >
                Status <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Attempted</DropdownMenuItem>
              <DropdownMenuItem>Not Started</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-white"
              >
                Topics <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Arrays</DropdownMenuItem>
              <DropdownMenuItem>Strings</DropdownMenuItem>
              <DropdownMenuItem>Dynamic Programming</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative flex-grow ml-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                className="w-full bg-[#1a1f2e] border-[#1a1f2e] pl-9 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </div> */}

        {/* Table */}
        <div className="rounded-md border-2 border-border overflow-hidden">
          <Table className="border-collapse">
            <TableHeader className="bg-secondary">
              <TableRow className=" hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">Name</TableHead>
                <TableHead className="text-gray-400 font-medium">Difficulty</TableHead>
                <TableHead className="text-gray-400 font-medium">Points</TableHead>
                <TableHead className="text-gray-400 font-medium text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem) => (
                <TableRow key={problem.id} className="hover:bg-primary border-y-2 cursor-pointer" onClick={()=>{ router.push(`/problems/${problem.id}`)}}>
                  <TableCell className="font-medium text-content-secondary p-3 ">{problem.title}</TableCell>
                  <TableCell>
                    <Step
                      data={problem.difficulty}
                      variant = {problem.difficulty}
                    >
                      {problem.difficulty}
                    </Step>
                  </TableCell>
                  <TableCell><Step data={"120 pts"}></Step></TableCell>
                  <TableCell className="text-center">
                    {problem.status === "completed" && <CircleCheckBig className="w-4 h-4 text-green-500 mx-auto" />}
                    {problem.status === "attempted" && <HelpCircle className="w-4 h-4 text-orange-500 mx-auto" />}
                    {(!problem.status || problem.status === "not-started") && <span className="text-gray-500">—</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-center mt-4 gap-1">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-gray-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-[#3e63dd] border-[#3e63dd] hover:bg-[#3e63dd] hover:border-[#3e63dd] text-white"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-gray-400"
          >
            2
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-gray-400"
          >
            ...
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-gray-400"
          >
            9
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-gray-400"
          >
            10
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-[#1a1f2e] border-[#1a1f2e] hover:bg-[#252b3b] hover:border-[#252b3b] text-gray-400"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div> */}
      </div>
    </div>
  )
}