"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { CTASection } from "@/components/sections/cta-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pb-20 md:pb-0">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] flex items-center">
        <Image
          src="/images/happy-owner.jpg"
          alt="Happy dog owner with their pet in a clean yard"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e12]/95 via-[#0f3d1a]/85 to-[#0f3d1a]/50" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 20c-4 0-7.5 3-8 7-0.5-2-2.5-3.5-5-3.5-3 0-5.5 2.5-5.5 5.5 0 4 4 7 9 11 3 2.5 5 4.5 5.5 5.5 0.5-1 2.5-3 5.5-5.5 5-4 9-7 9-11 0-3-2.5-5.5-5.5-5.5-2.5 0-4.5 1.5-5 3.5-0.5-4-4-7-8-7z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-[#6dd400] font-semibold text-xs sm:text-sm uppercase tracking-widest block mb-4">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#6dd400]">
                Niagara Pet Waste Removal
              </span>
            </h1>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed">
              Niagara&apos;s trusted pet waste removal service — keeping yards clean, one scoop at a time. We offer reliable, friendly, and fully insured commercial and residential services, helping homeowners and businesses maintain clean, safe, and enjoyable outdoor spaces.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
