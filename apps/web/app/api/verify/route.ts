import { NextRequest, NextResponse } from "next/server";
import { submissionType, testCaseType } from "../submissions/route";
import { prisma } from "@repo/db/prisma";


export async function POST(req: NextRequest) {
    const { submission_id } = await req.json();
    
        const submission : submissionType | null = await prisma.submission.findUnique({
            where:{
                id : submission_id
            }
        })
    
        const testCases : testCaseType[] | null = await prisma.testCase.findMany({
            where:{
                submissionId : submission_id
            }
        })
    
        return NextResponse.json({ testCases : testCases , submission : submission });
}