"use client"

import { motion } from "framer-motion"
import { Shield, Award, Clock, ThumbsUp } from "lucide-react"

const trustItems = [
  { icon: Shield, label: "Fully Insured", description: "Complete liability coverage" },
  { icon: Award, label: "Local Business", description: "Proudly serving Niagara" },
  { icon: ThumbsUp, label: "5-Star Rated", description: "Trusted by 500+ clients" },
  { icon: Clock, label: "Reliable Service", description: "Always on time, every time" },
]

export function TrustStrip() {
  return (
    <section className="py-8 sm:py-12 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-2 sm:gap-3"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-600/10 to-lime-500/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm sm:text-base">{item.label}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{item.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
