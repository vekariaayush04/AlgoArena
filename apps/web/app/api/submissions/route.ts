import { NextRequest, NextResponse } from "next/server";
import { prisma, STATUS, TESTCASESTATUS } from "@repo/db/prisma";
import { getProblem } from "./getCode";
import axios from "axios";
import { getCurrentSession } from "@/app/session";

export async function POST(req: NextRequest) {
  try {
    const { user } = await getCurrentSession();
    const { problem_id, language_id, code, contest_id, contest_problem_id } = await req.json();

    const problem = await prisma.problem.findUnique({
      where: {
        id: problem_id as string,
      },
    });
    
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    
    const { fullCode, inputs, outputs } = await getProblem(
      problem.slug,
      code as string
    );
    
    const options = {
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_JUDGE_API_BASE_URL}/submissions/batch`,
      params: {
        base64_encoded: 'false'
      },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        submissions: inputs.map((input, index) => ({
          language_id: 63,
          source_code: fullCode,
          stdin: input,
          expected_output: outputs[index],
          callback_url: `${process.env.NEXT_PUBLIC_CALLBACK_URL}/submission-callback`
        }))
      }
    };

    const response = await axios.request(options);

    const submissionData: any = {
      problemId: problem_id as string,
      languageId: language_id as number,
      code: code as string,
      userId: user?.id as string,
      status: "PENDING" as STATUS,
      fullCode: fullCode as string,
    };

    // Check contest existence first
    let contestExists = false;
    if (contest_id) {
      const contest = await prisma.contest.findUnique({
        where: { id: contest_id }
      });

      contestExists = contest !== null;
      
      if (contestExists) {
        submissionData.contestId = contest_id;
        
        // Now check contest problem existence ONLY if contest exists
        if (contest_id && problem_id) {
          const contestProblem = await prisma.contestProblem.findUnique({
            where: { 
              contestId_problemId: {
                contestId: contest_id,
                problemId: problem_id
              }
            }
          });
          
          if (contestProblem) {
            submissionData.contestProblemId = contestProblem.id;
            // console.log("Found contestProblem:", contestProblem.id);
          } else {
            // console.log("No contestProblem found for contestId:", contest_id, "problemId:", problem_id);
          }
        }
      }
    }


    const submission: submissionType = await prisma.submission.create({
      data: submissionData
    });

    // Run all test cases and keep updating in db
    const testCases: testCaseType[] = await Promise.all(
      response.data.map(async (submissionResult: any, index: number) => {
        const testCase = await prisma.testCase.create({
          data: {
            judge0SubmissionId: submissionResult.token as string,
            submissionId: submission.id,
            status: "PENDING" as TESTCASESTATUS,
            index,
          },
        });
        return testCase;
      })
    );

    return NextResponse.json({ testCases: testCases, submission: submission });
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export type testCaseType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: TESTCASESTATUS;
  memory: number | null;
  time: number | null;
  index: number;
  submissionId: string;
  judge0SubmissionId: string;
};

export type submissionType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  status: STATUS;
  fullCode: string;
  memory: number | null;
  time: number | null;
  userId: string;
  problemId: string;
  languageId: number;
  contestId: string | null;
  contestProblemId: string | null;
}