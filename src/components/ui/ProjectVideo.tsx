import { useEffect, useRef, useCallback, useState } from 'react'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(true)

  // Memoize the click handler to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  // Observe viewport visibility to pause video and avoid background work
  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsInView(entry.isIntersecting)
      },
      { root: null, rootMargin: '0px', threshold: 0.25 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Track page/tab visibility
  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    handleVisibility()
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView && isPageVisible) {
      // Try to play if visible
      const playPromise = video.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {/* ignore autoplay restrictions */})
      }
    } else {
      video.pause()
    }
  }, [isInView, isPageVisible, videoSrc])

  /**
   * Handle video end event for auto-rotation with debouncing
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnded = () => {
      // Only rotate when the video is actually visible
      if (!isInView || !isPageVisible) return

      // Clear any existing timeout
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      
      // Debounce the auto-rotation to prevent rapid cycling
      timeoutRef.current = window.setTimeout(() => {
        handleClick()
      }, 800) // slight delay
    }

    video.addEventListener('ended', handleVideoEnded)
    
    return () => {
      video.removeEventListener('ended', handleVideoEnded)
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [handleClick, isInView, isPageVisible])

  // Pause video when component unmounts to prevent memory leaks
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    return () => {
      video.pause()
      video.currentTime = 0
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative cursor-pointer group" onClick={handleClick}>
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