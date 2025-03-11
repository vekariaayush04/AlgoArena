import  fs  from "fs/promises";

const FILE_PATH = "../problems"

export async function generateBoilerplate(slug : string) {
    let content = await fs.readFile(`${FILE_PATH}/${slug}/structure.json`, "utf-8");
    let data = JSON.parse(content)
    let name = data.problemName;
    let fn = data.functionName;
    let inputDat : [] = data.inputStructure
    let outputDat : [] = data.outputStructure
    let fnArgs = inputDat.map((arg: any) => arg.name);
    //we want to make js boiler plate code from above data
    let boilerPlateCode = 
    `function ${fn}(${fnArgs.join(", ")}) 
{
    //write your code here
}` 
let isExist = await fs.exists(`${FILE_PATH}/${slug}/boilerplate`);
    if (isExist) {
        await fs.rmdir(`${FILE_PATH}/${slug}/boilerplate`, { recursive: true });
    }
    await fs.mkdir(`${FILE_PATH}/${slug}/boilerplate`);
    await fs.writeFile(`${FILE_PATH}/${slug}/boilerplate/index.js`, boilerPlateCode);
}


export async function generateBoilerplateFull(slug : string) {
    let content = await fs.readFile(`${FILE_PATH}/${slug}/structure.json`, "utf-8");
    let data = JSON.parse(content)
    let name = data.problemName;
    let fn = data.functionName;
    let inputDat : [] = data.inputStructure
    let outputDat : [] = data.outputStructure
    let fnArgs = inputDat.map((arg: any) => arg.name);
    //we want to make full js boiler plate code that we give to judge0 from above data to validate the code

    let boilerPlateCode = `
//user code here 

const input = require('fs').readFileSync('/dev/stdin', 'utf-8').trim().split('\\n').join(' ').split(' ');
${
    inputDat.map((arg: any, index: number) => {
        if (arg.type === "int") {
            return `const ${arg.name} = parseInt(input.shift());`
        } else if (arg.type === "string") {
            return `const ${arg.name} = input[${index}];`
        } else if (arg.type === "int[]") {
            let arg_size = `const ${arg.name}_size = parseInt(input.shift());`
            let arg_arr = `const ${arg.name} = input.splice(${0}, ${arg.name}_size).map(Number);`
            return `${arg_size}\n${arg_arr}`
        } else if (arg.type === "string[]") {
            let arg_size = `const ${arg.name}_size = parseInt(input.shift());`
            let arg_arr = `const ${arg.name} = input.splice(${0}, ${arg.name}_size);`
            return `${arg_size}\n${arg_arr}`
        }
    }).join("\n")
    }
const result = ${fn}(${fnArgs.join(", ")});
console.log(result);`
    let isExist = await fs.exists(`${FILE_PATH}/${slug}/boilerplate-full`);
    if (isExist) {
        await fs.rmdir(`${FILE_PATH}/${slug}/boilerplate-full`, { recursive: true });
    }

    await fs.mkdir(`${FILE_PATH}/${slug}/boilerplate-full`);
    await fs.writeFile(`${FILE_PATH}/${slug}/boilerplate-full/index.js`, boilerPlateCode);

}

generateBoilerplate(process.env.NAME!);
generateBoilerplateFull(process.env.NAME!);
