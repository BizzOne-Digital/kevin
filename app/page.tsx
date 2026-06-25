import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { HeroSection } from "@/components/sections/hero"
import { TrustStrip } from "@/components/sections/trust-strip"
import { ServicesPreview } from "@/components/sections/services-preview"
import { PricingPreview } from "@/components/sections/pricing-preview"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { Testimonials } from "@/components/sections/testimonials"
import { CTASection } from "@/components/sections/cta-section"
import { ServiceArea } from "@/components/sections/service-area"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <ServicesPreview />
      <PricingPreview />
      <ProductShowcase />
      <ServiceArea />
      <Testimonials />
      <CTASection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
