"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  _id: string; name: string; location: string; avatar: string; rating: number; text: string
}

const FALLBACK: Testimonial[] = [
  { _id:"1", name:"Sarah Mitchell", location:"St. Catharines", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rating:5, text:"Absolutely fantastic service! They show up on time every week and my yard has never looked better." },
  { _id:"2", name:"Michael Chen", location:"Niagara Falls", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating:5, text:"Professional, thorough, and affordable. They even send text reminders before each visit. Game changer!" },
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch("/api/testimonials")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTestimonials(data) })
      .catch(() => {/* use fallback */})
  }, [])

  const next = () => setCurrentIndex(p => (p + 1) % testimonials.length)
  const prev = () => setCurrentIndex(p => (p - 1 + testimonials.length) % testimonials.length)
  const t = testimonials[currentIndex]

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">What Our Clients Say</h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">Don&apos;t just take our word for it. Here&apos;s what pet owners across Niagara are saying.</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-50 }} transition={{ duration:0.3 }}
              className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-border relative">
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600/10 to-lime-500/10 flex items-center justify-center">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed mb-6 sm:mb-8 pr-8 sm:pr-0">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                {t.avatar ? (
                  <Image src={t.avatar} alt={t.name} width={56} height={56}
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover ring-4 ring-primary/20 flex-shrink-0" />
                ) : (
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#1db954] to-[#6dd400] flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-foreground text-sm sm:text-base">{t.name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{t.location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full w-9 h-9 sm:w-10 sm:h-10" aria-label="Previous">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-6 sm:w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                  aria-label={`Go to ${i + 1}`} />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full w-9 h-9 sm:w-10 sm:h-10" aria-label="Next">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
