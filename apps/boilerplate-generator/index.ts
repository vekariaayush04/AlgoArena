import  fs  from "fs/promises";

const FILE_PATH = process.env.FILE_PATH || "./";

export async function generateBoilerplate() {
    let content = await fs.readFile(`${FILE_PATH}/structure.json`, "utf-8");
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
let isExist = await fs.exists(`${FILE_PATH}/boilerplate`);
    if (isExist) {
        await fs.rmdir(`${FILE_PATH}/boilerplate`, { recursive: true });
    }
    await fs.mkdir(`${FILE_PATH}/boilerplate`);
    await fs.writeFile(`${FILE_PATH}/boilerplate/index.js`, boilerPlateCode);
}


export async function generateBoilerplateFull() {
    let content = await fs.readFile(`${FILE_PATH}/structure.json`, "utf-8");
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
    let isExist = await fs.exists(`${FILE_PATH}/boilerplate-full`);
    if (isExist) {
        await fs.rmdir(`${FILE_PATH}/boilerplate-full`, { recursive: true });
    }

    await fs.mkdir(`${FILE_PATH}/boilerplate-full`);
    await fs.writeFile(`${FILE_PATH}/boilerplate-full/index.js`, boilerPlateCode);

}

generateBoilerplate();
generateBoilerplateFull();
