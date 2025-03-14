import React from 'react';

interface BestRank {
  rank: string;
  contestName: string;
  contestLink: string;
}

interface ContestStatsProps {
  currentRank: string;
  totalContestsParticipated: number;
  bestRank: BestRank;
}

const ContestStats: React.FC<ContestStatsProps> = ({
  currentRank,
  totalContestsParticipated,
  bestRank
}) => {
  return (
    <div className="border-2 border-border rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Your Contest Stats</h2>
      
      <div className="space-y-4">
        <div className="bg-secondary rounded-lg p-3">
          <h3 className="text-sm text-gray-400 mb-1">Overall Contest Ranking</h3>
          <p className="text-sm">Your Current Rank: {currentRank}</p>
        </div>
        
        <div className="bg-secondary rounded-lg p-3 mb-11">
          <h3 className="text-sm text-gray-400 mb-1">Contests Participated</h3>
          <p className="text-sm">Total Contests Participated: {totalContestsParticipated}</p>
        </div>
        
        {/* <div className="bg-[#131A2C] rounded-lg p-3">
          <h3 className="text-sm text-gray-400 mb-1">Best Rank Achieved</h3>
          <p className="text-sm">
            Highest Rank: {bestRank.rank} in{' '}
            <a href={bestRank.contestLink} className="text-blue-400 hover:underline">
              {bestRank.contestName}
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ContestStats;