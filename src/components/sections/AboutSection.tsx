/**
 * AboutSection Component
 * 
 * Interactive project showcase section featuring auto-rotating video content.
 * Implements smooth transitions between projects with scroll-triggered animations.
 * 
 * @returns JSX.Element - Section with dynamic project videos and professional description
 */
'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Project data configuration
const projects = [
  {
    id: 1,
    title: "PASSLY SECURITY PLATFORM",
    description: "ENTERPRISE AUTHENTICATION SYSTEM",
    date: "MARCH 2024",
    video: "/passly.mp4"
  },
  {
    id: 2,
    title: "KEY MANAGEMENT SYSTEM", 
    description: "SECURE ENCRYPTION SOLUTION",
    date: "JANUARY 2024",
    video: "/key.mp4"
  }
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [isInView, setIsInView] = useState(false)

  /**
   * Set initial invisible state for smooth entrance animations
   */
  useEffect(() => {
    if (projectRef.current && textRef.current) {
      gsap.set([projectRef.current, textRef.current], { opacity: 0 })
    }
  }, [])

  /**
   * Initialize scroll trigger to detect when section enters viewport
   */
  useEffect(() => {
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => setIsInView(true),
        once: true
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  /**
   * Auto-rotate projects when video ends with smooth fade transitions
   */
  useEffect(() => {
    if (!isInView) return

    const videoElement = document.querySelector('video')
    if (!videoElement) return

    const handleVideoEnded = () => {
      // Smooth fade out of current video
      gsap.to(videoElement, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          // Switch project while invisible
          setCurrentProject(prev => (prev + 1) % projects.length)
          
          // Small delay for new video to load
          setTimeout(() => {
            // Smooth fade in of new video
            gsap.to(videoElement, {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out"
            })
          }, 200)
        }
      })
    }

    // Listen for video end event
    videoElement.addEventListener('ended', handleVideoEnded)
    
    // Cleanup event listener
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnded)
      }
    }
  }, [isInView, currentProject])

  /**
   * Animate entrance of section elements when in view
   */
  useEffect(() => {
    if (!isInView || !projectRef.current || !textRef.current) return

    // Animate video with simple fade in
    gsap.to(projectRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    })

    // Animate text with delayed fade in
    gsap.to(textRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.4
    })
  }, [isInView])

  /**
   * Animate project element transitions
   */
  useEffect(() => {
    if (!isInView || !projectRef.current) return

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
  }, [currentProject, isInView])

  /**
   * Handle project click interaction
   */
  const handleProjectClick = () => {
    console.log('View more of project:', projects[currentProject].title)
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white mt-20">
      {/* Smooth transition overlay at top for seamless section flow */}
      <div 
        className="absolute top-0 left-0 right-0 h-20 z-5"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(255, 255, 255, 0.8) 50%, 
            transparent 100%)`
        }}
      />

      <div className="relative z-10 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-32 items-center">
            
            {/* Left side - Dynamic project showcase (3 columns) */}
            <div className="lg:col-span-3 w-full">
              <div 
                ref={projectRef} 
                className="relative cursor-pointer group"
                onClick={handleProjectClick}
              >
                {/* Main video - Larger display */}
                <div className="relative overflow-hidden rounded-xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <video
                    key={projects[currentProject].video}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-auto object-cover transition-opacity duration-300"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <source src={projects[currentProject].video} type="video/mp4" />
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
                    {projects[currentProject].title}
                  </div>
                </div>

                {/* Date - Top Right */}
                <div className="absolute -top-8 right-0 project-element">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {projects[currentProject].date}
                  </div>
                </div>

                {/* Description - Bottom */}
                <div className="absolute -bottom-8 left-0 right-0 project-element">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {projects[currentProject].description}
                  </div>
                </div>

                {/* Progress indicator dots */}
                <div className="absolute -bottom-4 right-0 flex space-x-2 project-element">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentProject ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Professional description with more space (2 columns) */}
            <div className="lg:col-span-2 w-full h-full flex items-center justify-start pl-16 pr-8">
              <div 
                ref={textRef} 
                className="text-left w-full"
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