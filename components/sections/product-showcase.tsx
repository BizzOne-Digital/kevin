"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Droplets, Leaf, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { icon: Droplets, label: "Fast Acting" },
  { icon: Leaf, label: "Eco-Friendly" },
  { icon: Shield, label: "Pet Safe" },
]

export function ProductShowcase() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-background overflow-hidden w-full max-w-[100vw]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

          {/* Product Image — always on top on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative aspect-square max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 via-green-500/20 to-lime-500/30 blur-3xl" />

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative z-10 bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-border"
              >
                <Image
                  src="/ez clean.jpeg"
                  alt="EZ Clean Pet Waste Deodorizer Bottle"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-xl sm:rounded-2xl object-contain"
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg">
                  <span className="text-lg sm:text-2xl font-bold">$19.95</span>
                </div>
              </motion.div>

              {/* Floating rating — hidden on very small screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="hidden sm:flex absolute -right-3 lg:-right-4 top-1/4 bg-card rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg border border-border items-center gap-2"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground">4.9</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="hidden sm:block absolute -left-3 lg:-left-4 bottom-1/4 bg-gradient-to-r from-[#1db954] to-[#6dd400] text-white rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg text-xs sm:text-sm font-medium"
              >
                Best Seller
              </motion.div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-2"
          >
            <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Featured Product</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4">
              EZ Clean 1L Bottle
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-2">Pet Waste Deodorizer</p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              Our professional-grade deodorizer neutralizes odors instantly and leaves your yard smelling fresh.
              Safe for pets, kids, and plants. The same product our technicians use on every job.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-muted">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white shadow-lg shadow-emerald-900/25 font-bold h-11 sm:h-12 w-full sm:w-auto"
                asChild
              >
                <Link href="/contact?service=sanitizer">Add to Inquiry</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#1db954] text-[#1db954] hover:bg-green-50 font-bold h-11 sm:h-12 w-full sm:w-auto"
                asChild
              >
                <Link href="/services#sanitizer">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
