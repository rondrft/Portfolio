/**
 * AboutSection Component
 * 
 * Interactive project showcase section featuring auto-rotating video content.
 * Refactored for better maintainability and reusability with custom hooks and components.
 * 
 * @returns JSX.Element - Section with dynamic project videos and professional description
 */
'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations'
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
  
  // Use custom hook for scroll detection with proper typing
  const isInView = useScrollTrigger(sectionRef, "top 80%", true)

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

    // Create timeline for coordinated animations
    const tl = gsap.timeline()

    // Animate project with fade in and slight upward movement
    tl.to(projectRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    })

    // Animate text with delay
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8") // Start 0.8s before previous animation ends

    return () => {
      tl.kill()
    }
  }, [isInView, isInitialized])

  /**
   * Animate project element transitions
   */
  useEffect(() => {
    if (!isInView || !projectRef.current || !isInitialized) return

    const elements = projectRef.current.querySelectorAll('.project-element')
    
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

  /**
   * Handle project rotation and click interactions
   */
  const handleProjectInteraction = () => {
    console.log('View more of project:', videoProjects[currentProject].title)
    // Auto-rotate to next project
    setCurrentProject(prev => (prev + 1) % videoProjects.length)
  }

  const currentProjectData = videoProjects[currentProject]

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white mt-20">
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
                  isActive={true}
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