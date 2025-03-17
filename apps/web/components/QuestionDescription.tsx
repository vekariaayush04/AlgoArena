import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import { TabsContent } from "./ui/tabs";
import { ProblemComponent } from "./ProblemsPage/ProblemDesc";
import Submissions from "./ProblemsPage/Submissions";

type QuestionDescriptionProps = {
    problem : any
    isDone : boolean
    submissions : number
    p_id : string
    c_id? : string
}

const QuestionDescription : React.FC<QuestionDescriptionProps> = ({problem , isDone , submissions , p_id , c_id}) => {
  return (
    <div>
      <Tabs defaultValue="problem">
        <TabsList className="grid w-full grid-cols-2 text-content-primary bg-primary">
          <TabsTrigger
            value="problem"
            className="data-[state=active]:bg-border data-[state=active]:dark:bg-border data-[state=active]:text-content-primary"
          >
            Problem
          </TabsTrigger>
          <TabsTrigger
            value="submissions"
            className="data-[state=active]:bg-border data-[state=active]:dark:bg-border data-[state=active]:text-content-primary "
          >
            Submissions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="problem" className="">
          <div className="">
            <ProblemComponent
              problem={problem}
              isDone={isDone}
              submissions={submissions}
            />
          </div>
        </TabsContent>
        <TabsContent value="submissions">
          <div className="">
            <Submissions p_id={p_id} c_id={c_id}/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionDescription;
