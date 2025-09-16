'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TopicCardProps {
  title: string
  description: string
  icon: string
  gradient: string
  onClick?: () => void
}

export function TopicCard({ title, description, icon, gradient, onClick }: TopicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={`
        relative h-full w-full overflow-hidden cursor-pointer transition-all duration-700 ease-out
        transform ${isHovered ? 'scale-105 z-20' : 'scale-100 z-0'}
        ${isHovered ? 'shadow-2xl shadow-black/60' : 'shadow-lg shadow-black/20'}
        border-0 rounded-none
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${gradient} transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-80'}`} />
      
      {/* Overlay blur effect when not hovered */}
      <div 
        className={`
          absolute inset-0 backdrop-blur-sm bg-black/30 transition-all duration-700
          ${isHovered ? 'opacity-0 backdrop-blur-none' : 'opacity-80 backdrop-blur-md'}
        `} 
      />
      
      {/* Animated background particles */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isHovered ? 'opacity-40' : 'opacity-0'}`}>
        <div className="absolute top-20 left-16 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-white/70 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-24 left-24 w-2.5 h-2.5 bg-white/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Icon */}
        <div 
          className={`
            text-8xl mb-6 transition-all duration-500 transform
            ${isHovered ? 'scale-110 drop-shadow-lg' : 'scale-100'}
          `}
        >
          {icon}
        </div>
        
        {/* Title */}
        <h2 
          className={`
            text-3xl font-bold text-white mb-4 transition-all duration-500 transform
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}
          `}
        >
          {title}
        </h2>
        
        {/* Description */}
        <p 
          className={`
            text-lg text-white/90 mb-6 max-w-md transition-all duration-500 transform
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'}
          `}
        >
          {description}
        </p>
        
        {/* Button - only visible on hover */}
        <Button 
          variant="secondary"
          size="lg"
          className={`
            transition-all duration-500 transform bg-white/20 backdrop-blur-sm 
            hover:bg-white/30 text-white border-white/30
            ${isHovered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}
          `}
        >
          Explorar
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div 
        className={`
          absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full
          transition-all duration-700 transform
          ${isHovered ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
        `} 
      />
      <div 
        className={`
          absolute bottom-4 left-4 w-16 h-16 border border-white/10 rounded-full
          transition-all duration-500 transform delay-100
          ${isHovered ? '-rotate-90 scale-90' : 'rotate-0 scale-100'}
        `} 
      />
    </Card>
  )
}