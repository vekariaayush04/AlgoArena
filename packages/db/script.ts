import { prisma } from "@repo/db/prisma";
import fs from "fs/promises"

let PATH = "../../apps/problems/";
async function addDefaultCode(problem_slug : string, poblem_title : string) {
    const pb = await fs.readFile(`${PATH}/${problem_slug}/problem.md`, "utf-8");
    
    const problem = await prisma.problem.create({
        data:{
            slug: problem_slug,
            title: poblem_title,
            description: pb
        }
    })

    const code = await fs.readFile(`${PATH}/${problem_slug}/boilerplate/index.js`, "utf-8");
    // console.log(code);

    const l = await prisma.language.findFirst({})
    if(l === null){
        await prisma.language.create({
            data:{
                judge0Id : 63,
                name:"JavaScript",
                id : 63
            }
        })
    }

    const defaultCode  = await prisma.defaultCode.create({
        data:{  
            problemId: problem.id,
            languageId : 63,
            code,
        }
    })
    // console.log(defaultCode);
    
}

addDefaultCode(process.env.SLUG!, process.env.TITLE!);