import { useEffect, useState, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Custom hook for scroll-triggered animations
 * Provides reusable scroll detection logic with proper cleanup
 * 
 * @param triggerRef - Reference to the element to observe
 * @param startPosition - ScrollTrigger start position (default: "top 80%")
 * @param once - Whether to trigger only once (default: true)
 * @returns boolean - Whether the element is in view
 */
export const useScrollTrigger = (
  triggerRef: React.RefObject<HTMLElement | null>,
  startPosition: string = "top 80%",
  once: boolean = true
): boolean => {
  const [isInView, setIsInView] = useState(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!triggerRef.current) return

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: startPosition,
      onEnter: () => setIsInView(true),
      once
    })

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [triggerRef, startPosition, once])

  return isInView
}