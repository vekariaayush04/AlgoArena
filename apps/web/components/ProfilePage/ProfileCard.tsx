import React from "react";
import { PencilIcon } from "lucide-react";

interface ProfileCardProps {
  name: string;
  username: string;
  rank: string;
  profileImage: string;
  languages: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  rank,
  profileImage,
  languages,
}) => {
  return (
    <div className="bg-secondary rounded-lg p-4 flex flex-col gap-3 items-center">
      <div className="w-full flex gap-2">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="w-28 h-28 rounded-lg object-cover"
        />
        <div className="ml-3 flex flex-col justify-center">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm  mb-1 text-blue-600">@{username}</p>
          <p className="text-sm mb-4">Rank: {rank}</p>
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
        <PencilIcon size={16} />
        Edit Profile
      </button>

      <div className="w-full">
        <h3 className="text-lg font-medium mb-2">Most Used Language</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 text-content-secondary border-2 bg-primary text-xs rounded-md"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
