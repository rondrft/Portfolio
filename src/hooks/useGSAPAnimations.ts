import { useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Custom hook for GSAP animations
 * Provides reusable animation logic with proper cleanup
 * 
 * @param elements - Array of refs to animate
 * @param animationConfig - GSAP animation configuration
 * @param dependencies - Dependencies array for useEffect
 */
export const useGSAPAnimations = (
  elements: React.RefObject<HTMLElement | null>[],
  animationConfig: gsap.TweenVars,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const validElements = elements.filter(ref => ref.current)
    
    if (validElements.length === 0) return

    const targets = validElements.map(ref => ref.current)
    
    gsap.to(targets, animationConfig)

    return () => {
      gsap.killTweensOf(targets)
    }
  }, dependencies)
}