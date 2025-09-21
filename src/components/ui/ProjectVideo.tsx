import { useEffect, useRef, useCallback } from 'react'

interface ProjectVideoProps {
  videoSrc: string
  title: string
  date: string
  description: string
  onClick: () => void
}

/**
 * ProjectVideo Component
 * 
 * Optimized video component with proper cleanup and performance improvements.
 * Handles video transitions and interactive states without memory leaks.
 * 
 * @param props - Component props
 * @returns JSX.Element - Video component with project information
 */
export default function ProjectVideo({
  videoSrc,
  title,
  date,
  description,
  onClick
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Memoize the click handler to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  /**
   * Handle video end event for auto-rotation with debouncing
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnded = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // Debounce the auto-rotation to prevent rapid cycling
      timeoutRef.current = setTimeout(() => {
        handleClick()
      }, 1000) // 1 second delay
    }

    video.addEventListener('ended', handleVideoEnded)
    
    return () => {
      video.removeEventListener('ended', handleVideoEnded)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleClick])

  // Pause video when component unmounts to prevent memory leaks
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    return () => {
      video.pause()
      video.currentTime = 0
    }
  }, [])

  return (
    <div className="relative cursor-pointer group" onClick={handleClick}>
      {/* Main video container */}
      <div className="relative overflow-hidden rounded-xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          muted
          playsInline
          loop={false} // Explicitly disable loop to prevent infinite playback
          preload="metadata" // Only load metadata initially for better performance
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