"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { CTASection } from "@/components/sections/cta-section"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, ChevronDown, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Plan {
  _id: string; name: string; price: string; period: string; description: string
  features: string[]; popular: boolean; badge: string | null; cta: string
  category: "main" | "addon"
}

interface FAQ { _id: string; question: string; answer: string }

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-[#0a3d1a] text-base sm:text-lg">{faq.question}</span>
        <ChevronDown className={cn("w-5 h-5 text-[#1db954] flex-shrink-0 transition-transform duration-300", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white border-t border-gray-50">
          <p className="text-gray-600 text-base leading-relaxed pt-3">{faq.answer}</p>
        </div>
      )}
    </motion.div>
  )
}

export default function PricingPage() {
  const [mainPlans, setMainPlans] = useState<Plan[]>([])
  const [addons, setAddons]       = useState<Plan[]>([])
  const [faqs, setFaqs]           = useState<FAQ[]>([])

  useEffect(() => {
    fetch("/api/pricing")
      .then(r => r.json())
      .then((data: Plan[]) => {
        setMainPlans(data.filter(p => p.category === "main"))
        setAddons(data.filter(p => p.category === "addon"))
      })
    fetch("/api/faqs").then(r => r.json()).then(setFaqs)
  }, [])

  return (
    <main className="min-h-screen bg-white pb-20 md:pb-0">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[380px] sm:min-h-[500px] lg:min-h-[560px] flex items-center">
        <Image src="/images/hero-dog.jpg" alt="Happy dog in a clean yard" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e12]/95 via-[#0f3d1a]/85 to-[#0f3d1a]/40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="text-[#6dd400] font-semibold text-xs sm:text-sm uppercase tracking-widest block mb-3 sm:mb-4">Pricing</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Simple,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#6dd400]">Transparent</span>{" "}
              Pricing
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              No hidden fees. No long-term contracts. Just clean yards and happy pets.
            </p>
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm text-sm sm:text-base">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400 flex-shrink-0" />
              <span className="font-semibold">FREE First Visit with any 4-week commitment!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Plans */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-[#1db954] font-semibold text-xs sm:text-sm uppercase tracking-widest">Plans</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a3d1a] mt-3 mb-3 sm:mb-4">Choose Your Plan</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">All plans include text reminders, flexible scheduling, and no contracts.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto items-stretch">
            {mainPlans.map((plan, index) => (
              <motion.div key={plan._id} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: index * 0.1 }}
                className={cn("relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border flex flex-col transition-all duration-300",
                  plan.popular ? "border-[#1db954] shadow-2xl shadow-emerald-900/12 ring-1 ring-[#1db954]/20" : "border-gray-100 shadow-sm hover:shadow-xl hover:border-[#6dd400]/40")}>
                {plan.popular && <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-r from-[#1a5c2a] via-emerald-500 to-lime-400" />}
                {plan.badge && (
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-[#1db954] text-xs font-black uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-current" />{plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0a3d1a] mb-2 sm:mb-3">{plan.name}</h3>
                  <span className="text-xs text-gray-400 font-medium block mb-1">Starting at</span>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#0a3d1a]">{plan.price}</span>
                    <span className="text-gray-400 text-sm sm:text-base font-medium">{plan.period}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1db954]" />
                      </div>
                      <span className="text-gray-600 text-xs sm:text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={cn("w-full h-11 sm:h-12 font-bold text-sm mt-auto",
                  plan.popular ? "bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white shadow-lg shadow-emerald-900/20"
                               : "border-2 border-[#1db954] text-[#1db954] bg-transparent hover:bg-green-50")}
                  variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/contact#quote">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      {addons.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-14">
              <span className="text-[#1db954] font-semibold text-xs sm:text-sm uppercase tracking-widest">Add-Ons</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a3d1a] mt-3 mb-3 sm:mb-4">Additional Services</h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">Flexible add-on services to meet all your pet waste needs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto items-stretch">
              {addons.map((service, index) => (
                <motion.div key={service._id} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: index * 0.1 }}
                  className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#6dd400]/40 flex flex-col transition-all duration-300">
                  {service.badge && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />{service.badge}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0a3d1a] mb-1">{service.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">{service.description}</p>
                  <div className="flex-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-[#0a3d1a]">{service.price}</span>
                    {service.period && <span className="text-gray-400 text-sm ml-1">{service.period}</span>}
                  </div>
                  <Button className="w-full h-11 sm:h-12 font-bold text-sm border-2 border-[#1db954] text-[#1db954] bg-transparent hover:bg-green-50"
                    variant="outline" asChild>
                    <Link href="/contact#quote">{service.cta}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-14">
              <span className="text-[#1db954] font-semibold text-xs sm:text-sm uppercase tracking-widest">FAQ</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a3d1a] mt-3 mb-3 sm:mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">Got questions? We have answers.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map(faq => <FAQItem key={faq._id} faq={faq} />)}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
