import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Step } from "../LandingPage/StepBox";

const Submissions = () => {
  return (
    <div className="">
        <table className="w-full ">
            <thead className="h-12 bg-[#0F172A] text-white">
                <tr className="h-12">
                    <th className="w-[50%] rounded-tl-4xl">Status</th>
                    <th>Language</th>
                    <th>Runtime</th>
                    <th className="rounded-tr-4xl">Memory</th>
                </tr>
            </thead>
            <tbody className="h-12 bg-primary dark:bg-primary text-[#94A3B8] rounded-t-xl text-center border-border dark:border-border">
                <tr className="border-y h-12 border-border dark:border-border ">
                    <td>Accepted</td>
                    <td><Step>JavaScript</Step></td>
                    <td>14ms</td>
                    <td>N/A</td>
                </tr>
                <tr className="border-y h-12 border-border dark:border-border ">
                    <td>Accepted</td>
                    <td><Step>JavaScript</Step></td>
                    <td>14ms</td>
                    <td>N/A</td>
                </tr>
                <tr className="border-y h-12 border-border dark:border-border">
                    <td>Accepted</td>
                    <td><Step>JavaScript</Step></td>
                    <td>14ms</td>
                    <td>N/A</td>
                </tr>
                <tr className="border-y h-12 border-border dark:border-border">
                    <td>Accepted</td>
                    <td><Step>JavaScript</Step></td>
                    <td>14ms</td>
                    <td>N/A</td>
                </tr>
                <tr className="border-y h-12 border-border dark:border-border">
                    <td>Accepted</td>
                    <td><Step>JavaScript</Step></td>
                    <td>14ms</td>
                    <td>N/A</td>
                </tr>
            </tbody>
        </table>
      {/* <Table className="mt-5 bg-pink-800 rounded-t-3xl">
        <TableHeader className="rounded-t-3xl">
          <TableRow className="bg-[#0F172A] hover:bg-[#0F172A] rounded-t-3xl">
            <TableHead className="w-[50%] text-white">Status</TableHead>
            <TableHead className="text-white">Language</TableHead>
            <TableHead className="text-white">Runtime</TableHead>
            <TableHead className="text-white">Memory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  );
};

export default Submissions;
