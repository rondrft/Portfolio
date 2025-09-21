interface ProjectIndicatorProps {
    totalProjects: number
    currentProject: number
  }
  
  /**
   * ProjectIndicator Component
   * 
   * Visual indicator showing current project position in the rotation.
   * Displays dots with active state highlighting.
   * 
   * @param props - Component props
   * @returns JSX.Element - Progress indicator dots
   */
  export default function ProjectIndicator({ totalProjects, currentProject }: ProjectIndicatorProps) {
    return (
      <div className="absolute -bottom-4 right-0 flex space-x-2 project-element">
        {Array.from({ length: totalProjects }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentProject ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }