"use server"
import { ContestFormData } from "@/components/ContestPage/CreateContestForm";
import { prisma } from "@repo/db/prisma";

export async function createContestAction(data : ContestFormData) {
    try {
        // console.log(data);
        const dateTimeString = `${data.startDate}T${data.startTime}:00+05:30`;
        const dateObj = new Date(dateTimeString);

        const endDate = new Date(dateObj.getTime() + data.duration * 60000);
        
        const contest = await prisma.contest.create({
            data:{
                name : data.name,
                startDate : dateObj,
                endDate,
                duration : parseInt(data.duration as any)
            }
        })

        const problems = await Promise.all(data.problems.map(async (id,idx) => {
            const p = await prisma.contestProblem.create({
                data:{
                    problemId : id,
                    contestId : contest.id,
                    displayOrder : idx,
                    points : 100
                }
            })
            return p
        }))
        // console.log(contest);
        // console.log(problems);
        
        return {
            success : true,
            message : "Contest Created Successfully"
        }
    } catch (error) {
        // console.log(error);
        
        return {
            success : false,
            message : "Error Creating Contest"
        }
    }
}

