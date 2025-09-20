'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end justify-start bg-white overflow-hidden">

      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 400% 300% at left bottom, rgba(102, 143, 127, 1) 0%, rgba(102, 143, 127, 0.8) 12%, rgba(183, 219, 189, 0.6) 20%, rgba(102, 143, 127, 0.4) 30%, rgba(183, 219, 189, 0.3) 40%, rgba(102, 143, 127, 0.2) 50%, rgba(183, 219, 189, 0.15) 60%, rgba(102, 143, 127, 0.1) 70%, rgba(183, 219, 189, 0.05) 80%, rgba(102, 143, 127, 0.02) 90%, rgba(255, 255, 255, 0) 100%)`
        }}
      ></div>
      
      <div className="absolute top-24 -right-6  sm:-right-6  lg:-right-6  z-20 opacity-40">
        <div className="relative overflow-hidden rounded-4xl border-12 border-[#d4e6d7] border-t-[#d4e6d7] border-l-[#d4e6d7] border-b-[#d4e6d7] border-r-transparent">
          <Image
            src="/passly.png"
            alt="Passly"
            width={900}
            height={900}
            className="rounded-l-3xl"
          />
        </div>
      </div>
      
      <div className="relative z-10 px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
          <div className="mb-2">
            Building Secure
          </div>
          <div>
            Backend Architectures
          </div>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed">
          Specialized in Java & Spring Boot Security Engineering. Crafting robust, scalable backend architectures with enterprise-grade security implementations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
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