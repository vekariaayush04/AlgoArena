import fs from "fs/promises"
export async function getProblem(slug: string, code: string) {
    const PATH = "../problems";
    const problem = await fs.readFile(`${PATH}/${slug}/boilerplate-full/index.js`, "utf-8");
    const fullCode = problem.replace("//user code here ", code);

    const inputs = await getInputs(slug);
    const outputs = await getOutputs(slug);


    return {
        inputs,
        outputs,
        fullCode
    }
}

async function getInputs (slug: string) : Promise<String[]>  {
    const PATH = "../problems";
    const dir = await fs.readdir(`${PATH}/${slug}/tests/input`);
    const inputs = await Promise.all(dir.map(async (file) => {
        return await fs.readFile(`${PATH}/${slug}/tests/input/${file}`, "utf-8");
    }))
    return inputs;
}

async function getOutputs (slug: string) : Promise<String[]>  {
    const PATH = "../problems";
    const dir = await fs.readdir(`${PATH}/${slug}/tests/output`);
    const outputs = await Promise.all(dir.map(async (file) => {
        return await fs.readFile(`${PATH}/${slug}/tests/output/${file}`, "utf-8");
    }))
    return outputs;
}