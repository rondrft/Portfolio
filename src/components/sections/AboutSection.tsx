/**
 * AboutSection Component
 * 
 * Optimized interactive project showcase section with performance improvements.
 * Refactored for better maintainability and reduced memory leaks.
 * 
 * @returns JSX.Element - Section with dynamic project videos and professional description
 */
'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import ProjectVideo from '@/components/ui/ProjectVideo'
import ProjectIndicator from '@/components/ui/ProjectIndicator'
import SectionOverlay from '@/components/ui/SectionOverlay'
import { videoProjects } from '@/data/projects'

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null)
  
  // Use custom hook for scroll detection with proper typing
  const isInView = useScrollTrigger(sectionRef, "top 80%", true)

  // Memoize the project interaction handler
  const handleProjectInteraction = useCallback(() => {
    console.log('View more of project:', videoProjects[currentProject].title)
    // Auto-rotate to next project
    setCurrentProject(prev => (prev + 1) % videoProjects.length)
  }, [currentProject])

  /**
   * Set initial invisible state IMMEDIATELY on mount
   */
  useEffect(() => {
    if (projectRef.current && textRef.current) {
      // Set initial state immediately to prevent flash
      gsap.set([projectRef.current, textRef.current], { 
        opacity: 0,
        y: 20
      })
      setIsInitialized(true)
    }
  }, [])

  /**
   * Animate entrance of section elements when in view
   * Only animate if elements are initialized and in view
   */
  useEffect(() => {
    if (!isInView || !isInitialized || !projectRef.current || !textRef.current) return

    // Kill any existing timeline
    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill()
    }

    // Create timeline for coordinated animations
    animationTimelineRef.current = gsap.timeline()

    // Animate project with fade in and slight upward movement
    animationTimelineRef.current.to(projectRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    })

    // Animate text with delay
    animationTimelineRef.current.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8") // Start 0.8s before previous animation ends

    return () => {
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill()
        animationTimelineRef.current = null
      }
    }
  }, [isInView, isInitialized])

  /**
   * Animate project element transitions with proper cleanup
   */
  useEffect(() => {
    if (!isInView || !projectRef.current || !isInitialized) return

    const elements = projectRef.current.querySelectorAll('.project-element')
    
    // Kill any existing animations on these elements
    gsap.killTweensOf(elements)
    
    gsap.fromTo(elements, 
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }
    )
  }, [currentProject, isInView, isInitialized])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill()
      }
    }
  }, [])

  const currentProjectData = videoProjects[currentProject]

  return (
    <section ref={sectionRef} className="relative bg-white mb-70 mt-20">
      {/* Smooth transition overlay */}
      <SectionOverlay position="top" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-32 items-center">
            
            {/* Left side - Dynamic project showcase (3 columns) */}
            <div className="lg:col-span-3 w-full">
              <div 
                ref={projectRef} 
                className="relative"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                <ProjectVideo
                  videoSrc={currentProjectData.video}
                  title={currentProjectData.title}
                  date={currentProjectData.date}
                  description={currentProjectData.description}
                  onClick={handleProjectInteraction}
                />
                
                <ProjectIndicator 
                  totalProjects={videoProjects.length}
                  currentProject={currentProject}
                />
              </div>
            </div>

            {/* Right side - Professional description (2 columns) */}
            <div className="lg:col-span-2 w-full h-full flex items-center justify-start pl-16 pr-8">
              <div 
                ref={textRef} 
                className="text-left w-full"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                <p className="text-xl text-gray-600 leading-relaxed">
                  As a Backend Developer, I specialize in building secure, scalable architectures using Java and Spring Boot. 
                  My focus lies in creating enterprise-grade security implementations, role-based access controls, and robust 
                  systems that handle high-volume transactions with zero downtime while maintaining clean, maintainable code.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}