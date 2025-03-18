"use client"
import React from 'react'
import img from "@/public/svgCode.svg"
import light from "@/public/Hero Section Image light mode.svg"
import Image from 'next/image'
import { useTheme } from 'next-themes'


const HeroImages = () => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  
  if(isDark){
    return (
      <div className='p-1'>
          <Image src={img} alt='' className=''/>
      </div>
    )
  }else{
    return (
      <div>
          <Image src={light} alt='' className=''/>
      </div>
    )
  }
  
}

export default HeroImages