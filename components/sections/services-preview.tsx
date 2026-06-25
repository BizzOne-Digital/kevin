"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Sparkles, Droplets, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Calendar,
    title: "Weekly & Bi-Weekly Cleanup",
    description: "Scheduled, reliable visits to keep your yard spotless week after week. Starting at $23.00.",
    image: "/Weekly & Bi-Weekly.jpeg",
    href: "/services#weekly",
  },
  {
    icon: Sparkles,
    title: "One-Time Cleanups",
    description: "Ideal before open houses, special occasions, gatherings, or seasonal clean ups. Starting at $65.00.",
    image: "/One-Time Cleanups.jpeg",
    href: "/services#onetime",
  },
  {
    icon: Droplets,
    title: "Sanitizer & Deodorizer",
    description: "Eliminate odors and maintain a fresh, pet-safe lawn. Included with regular service plans.",
    image: "/Sanitizer & Deodorizer Treatments.jpeg",
    href: "/services#sanitizer",
  },
  {
    icon: Trash2,
    title: "Bucket Service",
    description: "The easiest way to manage your pet's waste — dog & cat. Only $9.00/week.",
    image: "/Bucket Service.jpeg",
    href: "/services#bucket",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <span className="text-[#1db954] font-semibold text-xs sm:text-sm uppercase tracking-widest">Our Services</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a3d1a] mt-3 mb-3 text-balance">
            Professional Pet Waste Solutions
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Reliable, friendly, and fully insured — helping homeowners and businesses maintain clean, safe outdoor spaces.
          </p>
        </motion.div>

        {/* 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#6dd400]/40 transition-all duration-300"
            >
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e12]/75 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-r from-[#1db954] to-[#6dd400] flex items-center justify-center shadow-lg">
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold text-[#0a3d1a] mb-2 group-hover:text-[#1db954] transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-[#1db954] font-semibold text-xs sm:text-sm group-hover:gap-2.5 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <Button
            size="lg"
            className="gap-2 border-2 border-[#1db954] text-[#1db954] bg-transparent hover:bg-green-50 font-bold w-full sm:w-auto"
            variant="outline"
            asChild
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
