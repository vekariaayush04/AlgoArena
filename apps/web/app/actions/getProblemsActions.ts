"use server"
import { prisma , type Problem } from "@repo/db/prisma"



export async function getProblems() : Promise<Problem[]> {
    
    const problems = await prisma.problem.findMany()

    return problems
    
}