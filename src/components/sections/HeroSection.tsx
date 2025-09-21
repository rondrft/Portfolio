'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

/**
 * HeroSection Component
 * 
 * Main landing section featuring animated content with gradient background.
 * Implements GSAP animations for smooth entrance effects and professional presentation.
 * 
 * @returns JSX.Element - Hero section with animated title, subtitle, CTA buttons and brand image
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  /**
   * Initialize entrance animations with coordinated timeline
   * Animates image, title, subtitle and buttons with staggered timing
   */
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !buttonsRef.current || !imageRef.current) return

    // Create coordinated animation timeline
    const tl = gsap.timeline({ delay: 0.2 })

    // Animate image and title simultaneously
    tl.to(imageRef.current, {
      opacity: 0.6,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "<")

    // Animate subtitle with faster timing
    .to(subtitleRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")

    // Animate buttons with faster timing
    .to(buttonsRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")

  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end justify-start bg-white overflow-hidden">
      {/* Extended gradient background with smooth color transitions */}
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
      
      {/* Smooth transition overlay at bottom for seamless section flow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-5"
        style={{
          background: `linear-gradient(to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 1) 100%)`
        }}
      />
     
      {/* Brand image positioned on right side with custom border styling */}
      <div ref={imageRef} className="absolute top-24 -right-6 sm:-right-6 lg:-right-6 z-30 opacity-0">
        <div className="relative overflow-hidden rounded-4xl border-12 border-[#d4e6d7] border-t-[#d4e6d7] border-l-[#d4e6d7] border-b-[#d4e6d7] border-r-transparent">
          <Image
            src="/passly.png"
            alt="Passly"
            width={900}
            height={900}
            className="rounded-l-2xl w-[400px] h-auto sm:w-[500px] md:w-[600px] lg:w-[600px] xl:w-[900px]"
          />
        </div>
      </div>
     
      {/* Main content area with animated elements */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-16 mb-10">
        {/* Animated main heading */}
        <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6 opacity-0">
          <div className="mb-2">
            Building Secure
          </div>
          <div>
            Backend Architectures
          </div>
        </h1>
       
        {/* Animated descriptive subtitle */}
        <p ref={subtitleRef} className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed opacity-0">
          Specialized in Java & Spring Boot Security Engineering. Crafting robust, scalable backend architectures with enterprise-grade security implementations.
        </p>
       
        {/* Animated call-to-action buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
            View Projects
          </button>
        </div>
      </div>
    </section>
  )
}