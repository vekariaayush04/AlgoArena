import express, {type Request, type Response} from "express";
import {prisma} from "@repo/db/prisma"
const app = express();
const PORT = 3001;


// Middleware to parse JSON
app.use(express.json());

// Route to handle Judge0 callbacks
app.put("/submission-callback", async (req : Request, res : Response) : Promise<any>=> {
    const body = req.body;

    const { token , status } = body;

    // Find the submission in the database

    const testCase = await prisma.testCase.findUnique({
        where: {
            judge0SubmissionId: token
        }
    });
    
    if (!testCase) {
        return res.status(404).send({msg : "Submission not found"});
    }

    // Update the status of the submission
    const statusData = getStatus(status.description)

    let testCases = await prisma.testCase.update({
        where: {
            judge0SubmissionId: token
        },
        data: {
            status: statusData as any
        }
    });
    //console.log(testCases);

    await new Promise<void>((res , rej) => {setTimeout(() => {res()},10000)})
    // Find all the test cases for the submission

    const AllTestCases = await prisma.testCase.findMany({
        where: {
            submissionId: testCase.submissionId
        }   
    })

    //console.log(AllTestCases);
    
    const failedTestCases = AllTestCases.filter((testCase) => testCase.status !== "AC");
    const pendingTestCases = AllTestCases.filter((testCase) => testCase.status === "PENDING");
    console.log(failedTestCases.length, pendingTestCases.length);
    

    if(pendingTestCases.length === 0) {
        let accepted = failedTestCases.length === 0;
        let status = accepted ? "ACCEPTED" : "REJECTED";
        console.log(status === "ACCEPTED" ? "Accepted" : "Wrong Answer");
        const res = await prisma.submission.update({
            where: {
                id : testCase.submissionId
            },
            data: {
                status : status as any
            }

    });
    //console.log(res);
    
    }
    
    res.status(200).send({msg : "Callback received", token});
});

// Start the server
app.listen(3001, '0.0.0.0', () => {
  console.log('Server started on port 3001');
});
  


function getStatus( status : string) : string {
    console.log(status);
    
    switch(status) {
        case "Accepted":
            return "AC";
        case "Wrong Answer":
            return "FAIL";
        case "Time Limit Exceeded":
            return "TLE";
        case "Compilation Error":
            return "COMPILE_ERROR";
        case "Runtime Error (NZEC)":
            return "FAIL";
        default:
            return "PENDING";
    }
}