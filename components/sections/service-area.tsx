"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, CheckCircle2 } from "lucide-react"

const FALLBACK = [
  "Niagara-on-the-Lake","St. Catharines","Niagara Falls","Port Colborne",
  "Welland","Thorold","Pelham","Fort Erie","Grimsby","Lincoln","West Lincoln","Wainfleet",
]

import type { Variants } from "framer-motion"

const containerVariants: Variants = { hidden:{}, visible:{ transition:{ staggerChildren:0.06 } } }
const cardVariants: Variants = {
  hidden:{ opacity:0, y:24, scale:0.93 },
  visible:{ opacity:1, y:0, scale:1, transition:{ type:"spring" as const, stiffness:200, damping:20 } },
}

export function ServiceArea() {
  const [areas, setAreas] = useState<string[]>(FALLBACK)

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.serviceAreas) && d.serviceAreas.length > 0) setAreas(d.serviceAreas) })
      .catch(() => {})
  }, [])

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#0f3d1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(34,197,94,0.18),transparent)]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage:`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 20c-4 0-7.5 3-8 7-0.5-2-2.5-3.5-5-3.5-3 0-5.5 2.5-5.5 5.5 0 4 4 7 9 11 3 2.5 5 4.5 5.5 5.5 0.5-1 2.5-3 5.5-5.5 5-4 9-7 9-11 0-3-2.5-5.5-5.5-5.5-2.5 0-4.5 1.5-5 3.5-0.5-4-4-7-8-7z' fill='%23ffffff'/%3E%3C/svg%3E")`,
        backgroundSize:"80px 80px",
      }} />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }}
            transition={{ type:"spring", stiffness:260, damping:20, delay:0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 mb-5 sm:mb-6">
            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-[#6dd400]" />
          </motion.div>
          <span className="text-[#6dd400] font-semibold text-xs sm:text-sm uppercase tracking-widest block mb-3">Service Area</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
            We Have{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#6dd400]">Niagara Covered</span>
          </h2>
          <p className="text-emerald-100/70 text-base sm:text-lg leading-relaxed">
            Proudly serving pet owners across the entire Niagara Region — from the Falls to the Lake.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto">
          {areas.map(area => (
            <motion.div key={area} variants={cardVariants} whileHover={{ scale:1.04, y:-3 }}
              className="group relative bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-emerald-400/50 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 cursor-default transition-colors duration-300 backdrop-blur-sm">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 group-hover:bg-green-500/40 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6dd400] group-hover:text-emerald-300 transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">{area}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.5 }}
          className="mt-10 sm:mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 sm:px-6 py-3 sm:py-4">
            <span className="text-emerald-100/70 text-sm">Not sure if we cover your area?</span>
            <a href="/contact" className="text-sm font-semibold text-[#6dd400] hover:text-emerald-300 underline underline-offset-4 transition-colors">Ask us →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
