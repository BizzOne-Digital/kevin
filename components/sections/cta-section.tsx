"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSiteSettings } from "@/lib/useSiteSettings"

export function CTASection() {
  const { settings } = useSiteSettings()

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <Image src="/images/clean-yard.jpg" alt="Clean yard" fill className="object-cover object-center" />
      <div className="absolute inset-0 bg-[#0a2e12]/70" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 20c-4 0-7.5 3-8 7-0.5-2-2.5-3.5-5-3.5-3 0-5.5 2.5-5.5 5.5 0 4 4 7 9 11 3 2.5 5 4.5 5.5 5.5 0.5-1 2.5-3 5.5-5.5 5-4 9-7 9-11 0-3-2.5-5.5-5.5-5.5-2.5 0-4.5 1.5-5 3.5-0.5-4-4-7-8-7z' fill='%23ffffff'/%3E%3C/svg%3E")`,
        backgroundSize: "80px 80px",
      }} />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto">
          <span className="text-emerald-400 font-semibold text-xs sm:text-sm uppercase tracking-widest block mb-3 sm:mb-4">
            Get Started Today
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {settings.ctaHeading}
          </h2>
          <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
            {settings.ctaSubtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg"
              className="bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white shadow-xl text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 gap-2 font-bold w-full sm:w-auto"
              asChild>
              <Link href={settings.ctaPrimaryUrl}>
                {settings.ctaPrimaryLabel}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline"
              className="border-2 border-white text-white bg-white/10 hover:bg-white/20 text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 gap-2 font-bold w-full sm:w-auto"
              asChild>
              <a href={settings.ctaSecondaryUrl}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                {settings.ctaSecondaryLabel}
              </a>
            </Button>
          </div>

          {settings.ctaFooterNote && (
            <p className="text-white/50 text-xs sm:text-sm mt-6 sm:mt-8">{settings.ctaFooterNote}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
