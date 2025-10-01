
import { HeroSection } from '@/components/home/hero-section'
import { ServicesGrid } from '@/components/home/services-grid'
import { FeaturedPackages } from '@/components/home/featured-packages'
import { AboutSection } from '@/components/home/about-section'
import { ContactCTA } from '@/components/home/contact-cta'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesGrid />
      <FeaturedPackages />
      <AboutSection />
      <ContactCTA />
    </div>
  )
}
