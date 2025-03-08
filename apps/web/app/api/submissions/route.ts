import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db/prisma";
import { auth } from "../../../auth";
import { getProblem } from "./getCode";
import { stdin } from "process";
import axios from "axios";


export async function POST(req: NextRequest) {
    const user =await auth()
    const { problem_id , language_id , code} = await req.json();

    const problem = await prisma.problem.findUnique({
        where: {
            id: problem_id as string
        }

    });
    if (!problem) {
        return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    //get full code with inputs and outputs (code enrichment)
    const {fullCode , inputs , outputs} = await getProblem(problem.slug, code as string);

    // axios request to judge0
    const response = await axios.post("http://localhost:2358/submissions/batch?base64_encoded=false",{
        submissions: inputs.map((input, index) => {
            return {
                language_id,
                source_code: fullCode,
                stdin: input,
                expected_output: outputs[index],
                callback_url: "http://host.docker.internal:3001/submission-callback"
            }
        })
    })

    //create submission

    const submission = await prisma.submission.create({
        data: {
            problemId: problem_id as string,
            languageId: language_id as number,
            code : code as string,
            userId: "cm7zv2lx30000taq4f4edvyip",
            status: "PENDING",
            fullCode: fullCode as string
        },
    });


    //run all test cases and keep updating in db

    response.data.forEach(async(submissionResult : any, index: number) => {
        await prisma.testCase.create({
            data: {
                judge0SubmissionId : submissionResult.token as string,
                submissionId: submission.id,
                status: "PENDING",  
                index
            }
        })
    })

    //update submission status



    return NextResponse.json(response.data);
}
