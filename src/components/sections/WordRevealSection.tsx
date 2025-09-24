/**
 * WordRevealSection Component
 * 
 * Animated text reveal section with word-by-word blur effect.
 * Features scroll-triggered animations and gradient background for professional presentation.
 * 
 * @returns JSX.Element - Section with animated word reveal and professional messaging
 */
'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WordRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [isInView, setIsInView] = useState(false)

  // Memoize text content to prevent unnecessary re-splits
  const words = useMemo(() => 
    "Every line of code I write is a building block toward bulletproof systems. Security isn't just a feature—it's the foundation that enables innovation to thrive without compromise.".split(' '),
    []
  )

  /**
   * Initialize scroll trigger to detect when section enters viewport
   * Store reference for proper cleanup
   */
  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => setIsInView(true),
      once: true
    })

    return () => {
      // Only kill this specific ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [])

  /**
   * Animate words one by one when section comes into view
   * Each word starts blurred and fades in with scale effect
   */
  useEffect(() => {
    if (!isInView || !textRef.current) return

    const wordElements = textRef.current.querySelectorAll('.word')
    
    // Set initial state: invisible with blur and scale effect
    gsap.set(wordElements, { 
      opacity: 0, 
      filter: 'blur(8px)',
      scale: 0.9
    })

    // Animate each word with staggered timing
    const animation = gsap.to(wordElements, {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      duration: 0.6,
      stagger: 0.1, // 0.1 seconds between each word
      ease: "power2.out"
    })

    return () => {
      // Clean up animation on unmount or re-render
      animation.kill()
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center">
      {/* Gradient background matching hero section */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 320% 220% at left bottom,
            rgba(102, 143, 127, 1) 0%,
            rgba(102, 143, 127, 0.95) 5%,
            rgba(102, 143, 127, 0.9) 10%,
            rgba(102, 143, 127, 0.85) 14%,
            rgba(102, 143, 127, 0.8) 18%,
            rgba(115, 155, 135, 0.75) 22%,
            rgba(102, 143, 127, 0.7) 26%,
            rgba(125, 165, 145, 0.65) 30%,
            rgba(102, 143, 127, 0.6) 35%,
            rgba(140, 180, 160, 0.55) 40%,
            rgba(102, 143, 127, 0.5) 45%,
            rgba(155, 195, 175, 0.45) 50%,
            rgba(102, 143, 127, 0.4) 55%,
            rgba(170, 210, 185, 0.35) 60%,
            rgba(102, 143, 127, 0.3) 65%,
            rgba(183, 219, 189, 0.25) 70%,
            rgba(102, 143, 127, 0.2) 75%,
            rgba(200, 230, 205, 0.15) 80%,
            rgba(102, 143, 127, 0.1) 85%,
            rgba(220, 240, 225, 0.05) 90%,
            rgba(240, 250, 245, 0.02) 95%,
            rgba(255, 255, 255, 1) 100%)`
        }}
      />

      {/* Centered content with animated text */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <p 
          ref={textRef}
          className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed text-center"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="word inline-block mr-2"
              style={{ 
                display: 'inline-block',
                marginRight: '0.5rem'
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}