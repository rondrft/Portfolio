import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Custom hook for scroll-triggered animations
 * Provides reusable scroll detection logic with cleanup
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

  useEffect(() => {
    if (!triggerRef.current) return

    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: startPosition,
      onEnter: () => setIsInView(true),
      once
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [triggerRef, startPosition, once])

  return isInView
}