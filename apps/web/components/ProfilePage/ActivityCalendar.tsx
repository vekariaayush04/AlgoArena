"use client"
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';

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
  const {resolvedTheme} = useTheme()
  return (
    <div className="border-2 border-border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm">{total} submissions in the last {months} months</h2>
        <div className="relative">
          <button className="flex items-center gap-1 text-sm border border-border rounded px-3 py-2">
            {year}
            {/* <ChevronDown size={16} /> */}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 mb-4 px-8">
        {calendarData.map((month, monthIndex) => (
          <div key={monthIndex} className="text-xs">
            <div className="mb-2 text-center text-gray-400">{month.month}</div>
            <div className="grid grid-cols-4 gap-0.5">
              {month.days.map((activity, dayIndex) => (
                <div 
                  key={dayIndex}
                  className={`w-2.5 h-2.5 rounded-xs ${
                    activity ? 'bg-green-500' : resolvedTheme === "light" ? `bg-[#E2E8F0]` : `bg-[#1E293B]`
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