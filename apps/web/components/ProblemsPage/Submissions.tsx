import { Step } from "../LandingPage/StepBox";
import { prisma } from "@repo/db/prisma";
import { getCurrentSession } from "@/app/session";
import { formatDistance, subDays } from "date-fns";

const Submissions = async ({ p_id , c_id }: { p_id: string , c_id? : string }) => {
  const { user } = await getCurrentSession();
  const submissions = await prisma.submission.findMany({
    where: {
      userId: user?.id,
      problemId: p_id,
      contestId:c_id
    },
    orderBy : {
      updatedAt : "desc"
    }
  });

  return (
    <div className="max-h-[500px] overflow-scroll overflow-x-hidden py-2 px-2">
      <table className="w-full ">
        <thead className="h-12 bg-secondary text-content-primary">
          <tr className="h-12">
            <th className="w-[50%] text-left pl-5">Status</th>
            <th>Language</th>
            <th>Runtime</th>
            <th className="">Memory</th>
          </tr>
        </thead>
        <tbody className="h-12 bg-primary dark:bg-primary text-[#94A3B8] rounded-t-xl text-center border-border dark:border-border">
          {submissions.map((s, i) => (
            <tr
              key={i}
              className="border-y h-12 border-border dark:border-border "
            >
              {s.status === "PENDING" ? (
                <td className="text-left">Pending</td>
              ) : s.status === "ACCEPTED" ? (
                <td className="text-left text-green-700 text-lg font-semibold pl-2">
                  Accepted{" "}
                  <span className="text-[#94A3B8] text-sm pl-2">{`${formatDistance(s.updatedAt, new Date(), { addSuffix: true })}`}</span>
                </td>
              ) : (
                <td className="text-left  text-red-600 text-lg font-semibold pl-2">
                  Rejected{" "}
                  <span className="text-[#94A3B8] text-sm pl-3">{`${formatDistance(s.updatedAt, new Date(), { addSuffix: true })}`}</span>
                </td>
              )}

              <td>
                <Step>JavaScript</Step>
              </td>
              <td>{`${s.time} MS`|| "N/A"}</td>
              <td>{`${(s.memory!/1024).toFixed(2)} KB`|| "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;

