"use client"

import { motion } from "framer-motion"

interface CircularTextProps {
  text: string
  className?: string
}

export function CircularText({ text, className = "" }: CircularTextProps) {
  const characters = text.split("")
  const radius = 80
  const fontSize = 12

  return (
    <div className={`relative w-48 h-48 ${className}`}>
      <motion.div className="absolute inset-0 animate-spin-slow" initial={{ rotate: 0 }}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
          </defs>
          <text className="fill-primary font-sans uppercase tracking-[0.3em]" style={{ fontSize: `${fontSize}px` }}>
            <textPath href="#circlePath">{text}</textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-serif text-3xl font-bold">B</span>
        </div>
      </div>
    </div>
  )
}