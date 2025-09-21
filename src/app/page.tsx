import AboutSection from '@/components/sections/AboutSection'
import BuildSecureSection from '@/components/sections/BuildSecureSection'
import HeroSection from '@/components/sections/HeroSection'
import WordRevealSection from '@/components/sections/WordRevealSection'

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <BuildSecureSection/>
      <AboutSection/>
      <WordRevealSection />
    </div>
  )
}
