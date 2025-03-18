import express, { type Request, type Response } from "express";
import { prisma } from "@repo/db/prisma";
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

// Route to handle Judge0 callbacks
app.put(
  "/submission-callback",
  async (req: Request, res: Response): Promise<any> => {
    const body = req.body;

    const { token, status, time, memory } = body;
    // console.log(body);

    // Find the submission in the database

    const testCase = await prisma.testCase.findUnique({
      where: {
        judge0SubmissionId: token,
      },
    });

    if (!testCase) {
      return res.status(404).send({ msg: "Submission not found" });
    }

    // Update the status of the submission
    const statusData = getStatus(status.description);
    // console.log(status);

    let testCases = await prisma.testCase.update({
      where: {
        judge0SubmissionId: token,
      },
      data: {
        status: statusData as any,
        time: parseFloat(time),
        memory,
      },
    });
    //console.log(testCases);

    // Find all the test cases for the submission

    const AllTestCases = await prisma.testCase.findMany({
      where: {
        submissionId: testCase.submissionId,
      },
    });

    //console.log(AllTestCases);

    const failedTestCases = AllTestCases.filter(
      (testCase) => testCase.status !== "AC"
    );
    const pendingTestCases = AllTestCases.filter(
      (testCase) => testCase.status === "PENDING"
    );
    //console.log(failedTestCases.length, pendingTestCases.length);

    if (pendingTestCases.length === 0) {
      let accepted = failedTestCases.length === 0;
      let status = accepted ? "ACCEPTED" : "REJECTED";
      // console.log(status === "ACCEPTED" ? "Accepted" : "Wrong Answer");
      let tTime = AllTestCases.reduce((a, t) => a + t.time!, 0);
      let tMemory = AllTestCases.reduce((a, t) => a + t.memory!, 0);
      const res = await prisma.submission.update({
        where: {
          id: testCase.submissionId,
        },
        data: {
          status: status as any,
          time: tTime,
          memory: tMemory,
        },
      });

      if(accepted && res.contestId){
        const points = await prisma.contestProblem.findUnique({
          where:{
            contestId_problemId:{
              contestId: res.contestId!,
              problemId:res.problemId
            }
          },
          select:{
            points:true
          }
        })
        // console.log(points);
        
        const participation = await prisma.contestParticipation.update({
          where:{
            userId_contestId:{
                  userId : res.userId,
                  contestId : res.contestId!
            }
          },
          data:{
            score : {
              increment : points?.points
            }
          }
          
        })
        // console.log(participation);
      }
      //console.log(res);
    }

    res.status(200).send({ msg: "Callback received", token });
  }
);

// Start the server
app.listen(3001, "0.0.0.0", () => {
  console.log("Server started on port 3001");
});

function getStatus(status: string): string {
  // console.log(status);

  switch (status) {
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
