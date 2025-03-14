import React from 'react';
// import { ChevronRight } from 'lucide-react';

interface Submission {
  id: string;
  problemName: string;
  timeAgo: string;
}

interface RecentSubmissionsProps {
  submissions: Submission[];
}

const RecentSubmissions: React.FC<RecentSubmissionsProps> = ({
  submissions
}) => {
  return (
    <div className="border-2 border-border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Recent Submissions</h2>
        {/* <a href="/submissions" className="text-blue-400 text-sm flex items-center hover:underline">
          View all <ChevronRight size={16} />
        </a> */}
      </div>
      
      <div className="space-y-2">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-secondary rounded-lg p-3 flex justify-between items-center">
            <a href={`/problem/${submission.id}`} className="hover:text-blue-400">
              {submission.problemName}
            </a>
            <span className="text-sm text-gray-400">{submission.timeAgo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSubmissions;