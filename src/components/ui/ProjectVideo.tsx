import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ProjectVideoProps {
  videoSrc: string
  title: string
  date: string
  description: string
  isActive: boolean
  onClick: () => void
}

/**
 * ProjectVideo Component
 * 
 * Reusable video component with hover effects and project information overlay.
 * Handles video transitions and interactive states.
 * 
 * @param props - Component props
 * @returns JSX.Element - Video component with project information
 */
export default function ProjectVideo({
  videoSrc,
  title,
  date,
  description,
  isActive,
  onClick
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  /**
   * Handle video end event for auto-rotation
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnded = () => {
      // Trigger parent component's rotation logic
      onClick()
    }

    video.addEventListener('ended', handleVideoEnded)
    
    return () => {
      video.removeEventListener('ended', handleVideoEnded)
    }
  }, [onClick])

  return (
    <div className="relative cursor-pointer group" onClick={onClick}>
      {/* Main video container */}
      <div className="relative overflow-hidden rounded-xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          muted
          playsInline
          className="w-full h-auto object-cover transition-opacity duration-300"
          style={{ aspectRatio: '16/9' }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support videos.
        </video>
        
        {/* Hover overlay with interaction prompt */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-lg font-medium">CLICK TO VIEW MORE</div>
        </div>
      </div>

      {/* Project information positioned around video */}
      {/* Title - Top Left */}
      <div className="absolute -top-8 left-0 project-element">
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </div>
      </div>

      {/* Date - Top Right */}
      <div className="absolute -top-8 right-0 project-element">
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {date}
        </div>
      </div>

      {/* Description - Bottom */}
      <div className="absolute -bottom-8 left-0 right-0 project-element">
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {description}
        </div>
      </div>
    </div>
  )
}