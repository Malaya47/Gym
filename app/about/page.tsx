import { Navbar } from "@/components/navbar"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AchievementsSection } from "@/components/about/achievements-section"
import { GymStorySection } from "@/components/about/gym-story-section"
import { EquipmentsSection } from "@/components/about/equipments-section"
import { TrainingZonesSection } from "@/components/about/training-zones-section"
import { OurTrainersSection } from "@/components/about/our-trainers-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen relative">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2071-U3psbOA2NUHDgaxxj2pfj82aOWxjKN.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <AboutHero />
        <AchievementsSection />
        <GymStorySection />
        <EquipmentsSection />
        <TrainingZonesSection />
        <OurTrainersSection />
        <TestimonialsSection />
        <CTASection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  )
}
