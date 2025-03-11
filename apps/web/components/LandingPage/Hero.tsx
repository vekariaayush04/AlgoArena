import React from 'react'
import { Button } from './../ui/button'
import HeroImages from './HeroImages'
import { ArrowRight } from "lucide-react";
import HowItWorks from './HowItWorks';


const Hero = () => {
  return (
    <div className='bg-[#020817]'>
        <div className="bg-[#020817] h-full flex justify-center items-center pt-32 flex-col gap-5 pb-16">
            <div className='flex flex-col gap-8'>
                <div className='text-6xl font-semibold text-center flex flex-col gap-3'>
                    <div className='text-white'>Conquer the Code at</div>
                    <div className='text-blue-700'>Algorithmic Arena</div>
                </div>
                <div className='text-[#94A3B8] font-semibold text-center text-sm'>Join elite coders, solve problems, and climb leaderboards at Algorithmic Arena.</div>
                <div className='flex justify-center gap-6 mb-6'>
                <Button className="bg-[#3259E8] h-full text-white text-md hover:bg-[#3259E8]">Start Solving</Button>
                <Button className="bg-[#020817] border-[#1E293B] border-1 h-full text-[#94A3B8] text-md">Explore new features <ArrowRight className="w-6 h-6 text-gray-500" /></Button>
                
                </div>
            </div>
            <HeroImages/>
        </div>
        <HowItWorks/>
    </div>
  )
}

export default Hero