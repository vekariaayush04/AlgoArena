import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className=' px-14 py-5 flex justify-between items-center bg-primary dark:bg-primary text-white border-t-1 border-border dark:border-border'>
        <div className='flex gap-4 text-[#94A3B8] text-md font-semibold'>
            <Link href="#"> Help & Support</Link>
            <Link href="#"> Report an Issue</Link>
            <Link href="#"> Privacy Policy</Link>
        </div>
        <div className="text-center text-[#94A3B8] text-md font-semibold">
          © {new Date().getFullYear()} Algorithmic Arena. All rights reserved.
        </div>
    </div>
  )
}

export default Footer