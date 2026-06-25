"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Weekly",
    price: "$23",
    period: "/visit",
    description: "Best value for regular maintenance",
    features: [
      "Weekly scheduled visits",
      "Complete yard coverage",
      "Waste properly disposed",
      "Text reminders",
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Bi-Weekly",
    price: "$33.50",
    period: "/visit",
    description: "Great for smaller yards or 1 dog",
    features: [
      "Every 2 weeks service",
      "Complete yard coverage",
      "Waste properly disposed",
      "Flexible scheduling",
    ],
    popular: false,
  },
  {
    name: "Spring Cleanup",
    price: "$65",
    period: "+",
    description: "Deep clean for neglected yards",
    features: [
      "One-time deep clean",
      "Up to 3 months buildup",
      "Complete sanitization",
      "Same-week service",
    ],
    popular: false,
  },
  {
    name: "Bucket Service",
    price: "$9",
    period: "/week",
    description: "Convenient waste stations",
    features: [
      "Station placement",
      "Weekly emptying",
      "Supplies included",
      "Odor control",
    ],
    popular: false,
  },
]

export function PricingPreview() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            No hidden fees. No contracts. Just clean yards and happy pets. Plus, get your first visit FREE with any 4-week commitment!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1db954] to-[#6dd400] text-white text-center shadow-lg shadow-green-500/25"
        >
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-base sm:text-lg">Special Offer</span>
          </div>
          <p className="text-white/90 text-sm sm:text-base">
            Get your <span className="font-bold">FREE First Visit</span> when you commit to 4 weeks of service!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg border transition-all duration-300 hover:shadow-xl",
                plan.popular ? "border-primary shadow-primary/10" : "border-border hover:border-primary/50"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1db954] to-[#6dd400] text-white text-xs font-semibold shadow-lg whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="text-center mb-4 sm:mb-6 pt-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={cn("w-full text-sm h-10 sm:h-11",
                  plan.popular ? "bg-gradient-to-r from-[#1db954] to-[#6dd400] text-white hover:from-emerald-700 hover:via-green-600 hover:to-lime-600" : ""
                )}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href="/contact">Get Started</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/pricing" className="text-primary font-medium hover:underline underline-offset-4 text-sm sm:text-base">
            View full pricing details →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
