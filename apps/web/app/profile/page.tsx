// ProfilePage.tsx
import ProfileCard from "@/components/ProfilePage/ProfileCard";
import ProblemSolvingOverview from "@/components/ProfilePage/ProfileSolvingOverview";
import ContestStats from "@/components/ProfilePage/ContestStats";
import ActivityCalendar from "@/components/ProfilePage/ActivityCalendar";
import RecentSubmissions from "@/components/ProfilePage/RecentSubmissions";
import NavBar from "@/components/NavBar";
import { getCurrentSession } from "../session";
import { prisma } from "@repo/db/prisma";
import {
  getProblemSolvingData,
  getProfileData,
  getRecentSubmissions,
  getSubmissionsData,
} from "../actions/ProfileActions";

const ProfilePage = async () => {
    const { user } = await getCurrentSession();
    if(!user){
        return null
    }
    const profileData = await getProfileData();
    const problemSolvingData = await getProblemSolvingData();
    const contestStatsData = {
        currentRank: "N/A",
        totalContestsParticipated: 0,
        bestRank: {
        rank: "N/A",
        contestName: "N/A",
        contestLink: "N/A",
        },
    };
    const submissionsData = await getSubmissionsData()
    const recentSubmissions = await getRecentSubmissions()

    return (
        <div className="flex flex-col min-h-screen bg-[#050A18] text-white">
        <NavBar status="LoggedIn" />
        <main className="flex-grow p-4 max-w-7xl mx-auto w-full mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 mb-4">
            {/* Left column */}
            <div className="lg:col-span-2">
                <ProfileCard
                name={profileData.name}
                username={profileData.username}
                rank={profileData.rank}
                profileImage={profileData.profileImage}
                languages={profileData.languages}
                />
            </div>

            {/* Middle column */}
            <div className="lg:col-span-3">
                <ProblemSolvingOverview
                solved={problemSolvingData.solved}
                difficultyProgress={problemSolvingData.difficultyProgress}
                />
            </div>

            {/* Right column */}
            <div className="lg:col-span-3">
                <ContestStats
                currentRank={contestStatsData.currentRank}
                totalContestsParticipated={
                    contestStatsData.totalContestsParticipated
                }
                bestRank={contestStatsData.bestRank}
                />
            </div>
            </div>

            {/* Activity Calendar */}
            <div className="mb-4">
            <ActivityCalendar
                total={submissionsData.total}
                months={submissionsData.months}
                year={submissionsData.year}
                calendarData={submissionsData.calendarData}
                currentStreak={submissionsData.currentStreak}
                highestStreak={submissionsData.highestStreak}
            />
            </div>

            {/* Recent Submissions */}
            <div className="mb-4">
            <RecentSubmissions submissions={recentSubmissions} />
            </div>
        </main>
        </div>
    );
};

export default ProfilePage;
