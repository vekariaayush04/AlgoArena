import { NextRequest, NextResponse } from "next/server";
import { prisma, STATUS, TESTCASESTATUS } from "@repo/db/prisma";
import { getProblem } from "./getCode";
import { stdin } from "process";
import axios from "axios";
import { getCurrentSession } from "@/app/session";

export async function POST(req: NextRequest) {
  const { user } = await getCurrentSession();
  const { problem_id, language_id, code } = await req.json();

  const problem = await prisma.problem.findUnique({
    where: {
      id: problem_id as string,
    },
  });
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  //get full code with inputs and outputs (code enrichment)
  const { fullCode, inputs, outputs } = await getProblem(
    problem.slug,
    code as string
  );

  // axios request to judge0
  const response = await axios.post(
    "http://localhost:2358/submissions/batch?base64_encoded=false",
    {
      submissions: inputs.map((input, index) => {
        return {
          language_id: 63,
          source_code: fullCode,
          stdin: input,
          expected_output: outputs[index],
          callback_url: "http://host.docker.internal:3001/submission-callback",
        };
      }),
    }
  );

  //create submission

  const submission : submissionType = await prisma.submission.create({
    data: {
      problemId: problem_id as string,
      languageId: language_id as number,
      code: code as string,
      userId: user?.id as string,
      status: "PENDING",
      fullCode: fullCode as string,
    },
  });

  //run all test cases and keep updating in db
  const testCases: testCaseType[] = await Promise.all(
    response.data.map(async (submissionResult: any, index: number) => {
      const testCase = await prisma.testCase.create({
        data: {
          judge0SubmissionId: submissionResult.token as string,
          submissionId: submission.id,
          status: "PENDING",
          index,
        },
      });
      return testCase;
    })
  );
  //update submission status

  return NextResponse.json({ testCases : testCases , submission : submission });
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
}