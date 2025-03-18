import React from 'react'
import { Problem } from '@/app/problems/page'
import ProblemsDisplay from './ProblemsDisplay'

const ProblemPage = ({problems} : {
    problems : Problem[]
}) => {
  return (
    <div className='bg-primary dark:bg-primary text-content-primary flex flex-col py-10 md:px-24 px-5'>
        <div className='flex flex-col gap-3'>
            <div className='text-4xl font-semibold'>Problems</div>
            <div className='text-[#94A3B8] text-semibold text-md'>Sharpen Your Skills with Diverse Challenges</div>
        </div>
        <div>
            <ProblemsDisplay problems={problems}/>
        </div>
    </div>
  )
}

export default ProblemPage