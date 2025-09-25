/**
 * BuildSecureSection Component
 * 
 * Animated text section featuring gradient text effects and scroll-triggered animations.
 * Displays professional messaging with smooth entrance animations and continuous gradient movement.
 * 
 * @returns JSX.Element - Section with animated "Build Secure" text and description
 */
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BuildSecureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const gradientAnimationRef = useRef<gsap.core.Tween | null>(null)

  /**
   * Set initial invisible state for smooth entrance animation
   */
  useEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0 })
    }
  }, [])

  /**
   * Initialize scroll-triggered animations and continuous gradient movement
   */
  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    // Smooth entrance animation when section comes into view
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      animation: gsap.to(textRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }),
      once: true
    })

    // Continuous gradient animation for "Secure" text
    const secureElement = textRef.current.querySelector('.secure-text')
    if (secureElement) {
      gradientAnimationRef.current = gsap.to(secureElement, {
        backgroundPosition: "400% center",
        duration: 4,
        ease: "none",
        repeat: -1
      })
    }

    return () => {
      // Only kill this specific ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
      // Kill gradient animation
      if (gradientAnimationRef.current) {
        gradientAnimationRef.current.kill()
        gradientAnimationRef.current = null
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white mt-30 mb-80 ">
      {/* Custom CSS for gradient text animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .secure-text {
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div 
          ref={textRef} 
          className="text-center"
        >
          {/* Main heading with animated gradient text */}
          <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none">
            <span className="text-gray-900">Build </span>
            <span 
              className="secure-text"
              style={{
                background: `linear-gradient(
                  90deg,
                  rgba(80, 120, 100, 1) 0%,
                  rgba(160, 200, 180, 1) 25%,
                  rgba(80, 120, 100, 1) 50%,
                  rgba(160, 200, 180, 1) 75%,
                  rgba(80, 120, 100, 1) 100%
                )`,
                backgroundSize: '300% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Secure
            </span>
          </h2>
          
          {/* Professional description text */}
          <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade backend solutions with bulletproof security implementations 
            that scale seamlessly and protect what matters most.
          </p>
        </div>
      </div>
    </section>
  )
}