export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  imageUrl: string
  projectUrl?: string
  githubUrl?: string
  featured: boolean
  completedAt: Date
  category: 'backend' | 'security' | 'api' | 'microservices'
}

// Interface specifically for video projects in AboutSection
export interface VideoProject {
  id: number
  title: string
  description: string
  date: string
  video: string
}

export const projects: Project[] = [
  // Future projects will be added here
  {
    id: 'secure-auth-service',
    title: 'Enterprise Authentication Service',
    description: 'JWT-based authentication microservice with OAuth2 integration and advanced security features.',
    longDescription: 'A comprehensive authentication service built with Spring Boot and Spring Security, featuring JWT token management, OAuth2 integration, rate limiting, and advanced security measures like CSRF protection and SQL injection prevention.',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'OAuth2', 'PostgreSQL', 'Redis'],
    imageUrl: '/projects/auth-service.jpg',
    githubUrl: 'https://github.com/ron/secure-auth-service',
    featured: true,
    completedAt: new Date('2024-03-15'),
    category: 'security'
  },
  {
    id: 'payment-processing-api',
    title: 'Secure Payment Processing API',
    description: 'PCI-compliant payment processing system with encryption and fraud detection.',
    longDescription: 'A secure payment processing API that handles sensitive financial data with end-to-end encryption, PCI compliance, fraud detection algorithms, and integration with multiple payment gateways.',
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Docker', 'AWS'],
    imageUrl: '/projects/payment-api.jpg',
    githubUrl: 'https://github.com/ron/payment-api',
    featured: true,
    completedAt: new Date('2024-02-20'),
    category: 'api'
  }
]

// Video projects data for AboutSection
export const videoProjects: VideoProject[] = [
  {
    id: 1,
    title: "PASSLY SECURITY PLATFORM",
    description: "ENTERPRISE AUTHENTICATION SYSTEM",
    date: "SEPTEMBER 2025",
    video: "/passly.mp4"
  },
  {
    id: 2,
    title: "KEY MANAGEMENT SYSTEM", 
    description: "SECURE ENCRYPTION SOLUTION",
    date: "MAY 2025",
    video: "/key.mp4"
  }
]

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured)
}

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category)
}