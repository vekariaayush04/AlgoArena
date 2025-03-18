"use server"
import { prisma } from "@repo/db/prisma";

export async function registerUser(userId : string ,contestId : string) {
    try {
        const registration =  await prisma.contestParticipation.create({
            data:{
                contestId,
                userId
            }
        })
        // console.log(registration);
        
        return {
            sucess : true,
            message : `Registered for Contest`
        }
    } catch (error) {
        // console.log(error);
        return {
            sucess : false,
            message : `Error Registering`
        }
    }
}


export async function unregisterUser(userId : string ,contestId : string) {
    try {
        const registration =  await prisma.contestParticipation.delete({
            where:{
                userId_contestId: {
                    userId,
                    contestId
                }
            }
        })
        // console.log(registration);
        
        return {
            sucess : true,
            message : `UnRegistered Contest Successfully`
        }
    } catch (error) {
        // console.log(error);
        return {
            sucess : false,
            message : `Error UnRegistering`
        }
    }
}

