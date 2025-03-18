import { format, getTime } from 'date-fns'
import React from 'react'

type ContestDetailsProps = {
    totalProblems : number,
    StartDate : Date
    duration : number
}
const ContestDetails : React.FC<ContestDetailsProps> = ({totalProblems , StartDate , duration}) => {
  return (
    <div className='flex flex-col md:gap-2 pl-1 gap-5 pt-5 md:pt-2'>
        <div className='text-2xl font-semibold'>Contest Details</div>
        <div className='text-content-secondary'>Join the Weekly Code Clash to test your coding skills against challenging problems designed to push your limits. Compete individually, solve a variety of algorithmic challenges, and aim for the top spot on the leaderboard</div>
        <div className='md:grid md:grid-cols-5 flex flex-col gap-6 pt-2'>
            <div className='col-span-1 flex justify-center items-center flex-col bg-secondary py-14 rounded-lg px-8 gap-3'>
                <div className='text-content-primary text-xl'>Total Problems</div>
                <div className='text-content-secondary'>{`${totalProblems} problems`}</div>
            </div>
            <div className='col-span-1 flex justify-center items-center flex-col bg-secondary py-14 rounded-lg px-8 gap-3'>
                <div className='text-content-primary text-xl'>Total Points</div>
                <div className='text-content-secondary'>{totalProblems * 100}</div>
            </div>
            <div className='col-span-1 flex justify-center items-center flex-col bg-secondary py-14 rounded-lg px-8 gap-3'>
                <div className='text-content-primary text-xl'>Start Date & Time</div>
                <div className='text-content-secondary'>{format(StartDate!, "dd MMMM, yyyy")}</div>
            </div>
            <div className='col-span-1 flex justify-center items-center flex-col bg-secondary py-14 rounded-lg px-8 gap-3'>
                <div className='text-content-primary text-xl'>Time</div>
                <div className='text-content-secondary'>{`${format(StartDate!, "h:mm a")} (IST)`}</div>
            </div>
            <div className='col-span-1 flex justify-center items-center flex-col bg-secondary py-14 rounded-lg px-8 gap-3'>
                <div className='text-content-primary text-xl'>Duration</div>
                <div className='text-content-secondary'>{`${duration} minutes`}</div>
            </div>
        </div>
    </div>
  )
}

export default ContestDetails