"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Phone, Shield, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSiteSettings } from "@/lib/useSiteSettings"

const badges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: MapPin,  label: "Local & Trusted" },
  { icon: Star,    label: "5-Star Service" },
]

export function HeroSection() {
  const { settings } = useSiteSettings()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background py-12 sm:py-16 lg:py-24 pb-20 md:pb-12 w-full max-w-[100vw]">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-4 0-7.5 3-8 7-0.5-2-2.5-3.5-5-3.5-3 0-5.5 2.5-5.5 5.5 0 4 4 7 9 11 3 2.5 5 4.5 5.5 5.5 0.5-1 2.5-3 5.5-5.5 5-4 9-7 9-11 0-3-2.5-5.5-5.5-5.5-2.5 0-4.5 1.5-5 3.5-0.5-4-4-7-8-7z' fill='%2316A34A' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
              Niagara Region&apos;s Premier Pet Service
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Niagara&apos;s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500">
                #1 Pet Waste
              </span>{" "}
              Removal Service
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Keeping yards clean, one scoop at a time. Reliable, friendly, and fully insured.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg"
                className="bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white shadow-lg shadow-green-500/25 text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 w-full sm:w-auto"
                asChild>
                <Link href={settings.heroPrimaryUrl}>{settings.heroPrimaryLabel}</Link>
              </Button>
              <Button size="lg" variant="outline"
                className="text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 gap-2 w-full sm:w-auto"
                asChild>
                <a href={settings.heroSecondaryUrl}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  {settings.heroSecondaryLabel}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/hero-dog.jpg" alt="Happy dog in a clean yard" width={800} height={600}
                className="w-full h-56 sm:h-72 lg:h-auto object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="hidden sm:flex absolute -left-3 lg:-left-8 top-1/2 -translate-y-1/2 flex-col gap-2 lg:gap-3">
              {badges.map((badge, index) => (
                <motion.div key={badge.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-card/95 backdrop-blur-sm rounded-xl px-3 py-2 lg:px-4 lg:py-3 shadow-lg border border-border flex items-center gap-2 lg:gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r from-[#1db954] to-[#6dd400] flex items-center justify-center flex-shrink-0">
                    <badge.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <span className="text-xs lg:text-sm font-medium text-foreground whitespace-nowrap">{badge.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="absolute -z-10 right-0 -bottom-8 w-48 lg:w-64 h-48 lg:h-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-lime-500/20 blur-3xl" />
            <div className="absolute -z-10 left-0 -top-8 w-36 lg:w-48 h-36 lg:h-48 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
