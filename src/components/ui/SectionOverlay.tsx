interface SectionOverlayProps {
    position: 'top' | 'bottom'
    height?: string
  }
  
  /**
   * SectionOverlay Component
   * 
   * Reusable gradient overlay for smooth section transitions.
   * Provides seamless visual flow between sections.
   * 
   * @param props - Component props
   * @returns JSX.Element - Gradient overlay
   */
  export default function SectionOverlay({ position, height = 'h-20' }: SectionOverlayProps) {
    const gradientDirection = position === 'top' ? 'to bottom' : 'to top'
    const gradientColors = position === 'top' 
      ? 'rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%'
      : 'transparent 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 1) 100%'
  
    return (
      <div 
        className={`absolute ${position}-0 left-0 right-0 ${height} z-5`}
        style={{
          background: `linear-gradient(${gradientDirection}, ${gradientColors})`
        }}
      />
    )
  }