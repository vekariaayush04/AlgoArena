import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CalendarMonth {
  month: string;
  days: number[];
}

interface ActivityCalendarProps {
  total: number;
  months: number;
  year: number;
  calendarData: CalendarMonth[];
  currentStreak: number;
  highestStreak: number;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  total,
  months,
  year,
  calendarData,
  currentStreak,
  highestStreak
}) => {
  return (
    <div className="bg-[#0A1022] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm">{total} submissions in the last {months} months</h2>
        <div className="relative">
          <button className="flex items-center gap-1 text-sm bg-[#131A2C] rounded px-3 py-2">
            {year}
            {/* <ChevronDown size={16} /> */}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-2 mb-4">
        {calendarData.map((month, monthIndex) => (
          <div key={monthIndex} className="text-xs">
            <div className="mb-2 text-center text-gray-400">{month.month}</div>
            <div className="grid grid-cols-7 gap-1">
              {month.days.map((activity, dayIndex) => (
                <div 
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm ${
                    activity ? 'bg-green-600' : 'bg-[#131A2C]'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-sm text-gray-400">
        <div>Current streak: {currentStreak}</div>
        <div>Highest streak: {highestStreak}</div>
      </div>
    </div>
  );
};

export default ActivityCalendar;