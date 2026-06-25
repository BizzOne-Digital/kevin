"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Service Area",
    details: ["Niagara Falls", "St. Catharines", "Welland", "Thorold", "& Surrounding Areas"],
  },
  {
    icon: Phone,
    title: "Call / Text",
    details: ["289-788-1319"],
    action: { href: "tel:+12897881319", label: "Call Now" },
  },
  {
    icon: Mail,
    title: "Email",
    details: ["dogpoopcrew@gmail.com"],
    action: { href: "mailto:dogpoopcrew@gmail.com", label: "Send Email" },
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Monday – Saturday: 8am – 6pm", "Sunday: Closed"],
  },
]

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "weekly", label: "Weekly Cleanup — Starting at $23.00" },
  { value: "biweekly", label: "Bi-Weekly Cleanup — Starting at $33.50" },
  { value: "onetime", label: "One-Time / Spring Cleanup — Starting at $65.00" },
  { value: "sanitizer", label: "Sanitizer & Deodorizer Treatment" },
  { value: "bucket", label: "Bucket Service — $9.00/week" },
  { value: "other", label: "Other / Not Sure" },
]

function ContactForm() {
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get("service") ?? ""

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedService, setSelectedService] = useState(preselectedService)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" })

  useEffect(() => {
    setSelectedService(preselectedService)
  }, [preselectedService])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const serviceName = serviceOptions.find(o => o.value === selectedService)?.label || selectedService || "Not specified"

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: serviceName }),
      })
      const data = await res.json()
      if (data.success) {
        setIsSubmitted(true)
      } else {
        setError("Something went wrong. Please try again or call us directly.")
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 rounded-full bg-[#0a2e12] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#6dd400]" />
        </div>
        <h3 className="text-2xl font-bold text-[#0a3d1a] mb-3">Thank You!</h3>
        <p className="text-gray-500 mb-6">
          Your message has been sent. We&apos;ll get back to you shortly!
        </p>
        <Button
          variant="outline"
          className="border-[#1db954] text-[#1db954] hover:bg-green-50"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-gray-700 font-semibold text-sm">Name *</Label>
          <Input id="name" name="name" placeholder="Your name" required
            value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
            className="h-12 rounded-xl border-gray-200 focus:border-[#1db954] focus:ring-[#1db954]/20" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-gray-700 font-semibold text-sm">Phone *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="289-788-1319" required
            value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
            className="h-12 rounded-xl border-gray-200 focus:border-[#1db954] focus:ring-[#1db954]/20" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-gray-700 font-semibold text-sm">Email</Label>
        <Input id="email" name="email" type="email" placeholder="your@email.com"
          value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
          className="h-12 rounded-xl border-gray-200 focus:border-[#1db954] focus:ring-[#1db954]/20" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="service" className="text-gray-700 font-semibold text-sm">Service Interested In</Label>
        <select
          id="service"
          name="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full h-12 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:border-[#1db954] focus:ring-2 focus:ring-[#1db954]/20"
        >
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {selectedService && selectedService !== "" && (
          <p className="text-xs text-[#1db954] font-medium mt-1 pl-1">
            ✓ {serviceOptions.find(o => o.value === selectedService)?.label}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-gray-700 font-semibold text-sm">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your needs, yard size, number of dogs, etc."
          required
          rows={5}
          value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
          className="rounded-xl border-gray-200 resize-none focus:border-[#1db954] focus:ring-[#1db954]/20"
        />
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white shadow-lg shadow-emerald-900/20 h-14 gap-2 font-semibold rounded-xl disabled:opacity-60"
      >
        <Send className="w-5 h-5" />
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pb-20 md:pb-0">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] flex items-center">
        <Image
          src="/images/clean-yard.jpg"
          alt="Clean yard ready for service"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e12]/95 via-[#0f3d1a]/85 to-[#0f3d1a]/40" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 20c-4 0-7.5 3-8 7-0.5-2-2.5-3.5-5-3.5-3 0-5.5 2.5-5.5 5.5 0 4 4 7 9 11 3 2.5 5 4.5 5.5 5.5 0.5-1 2.5-3 5.5-5.5 5-4 9-7 9-11 0-3-2.5-5.5-5.5-5.5-2.5 0-4.5 1.5-5 3.5-0.5-4-4-7-8-7z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="text-[#6dd400] font-semibold text-sm uppercase tracking-widest block mb-4">Contact Us</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Ready for a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#6dd400]">
                Cleaner Yard?
              </span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Get in touch today to schedule your service or ask any questions. We&apos;d love to help make your yard pristine again!
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="tel:+12897881319" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm">
                <Phone className="w-4 h-4 text-[#6dd400]" />
                Call Now
              </a>
              <a href="sms:+12897881319" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm">
                <MessageCircle className="w-4 h-4 text-[#6dd400]" />
                Text Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="py-12 sm:py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-[#1db954] font-semibold text-sm uppercase tracking-widest">Reach Out</span>
              <h2 className="text-3xl font-bold text-[#0a3d1a] mt-2 mb-8">Get In Touch</h2>

              <div className="space-y-4 mb-10">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6dd400]/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0a2e12] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#6dd400]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0a3d1a] mb-1">{item.title}</h3>
                      {item.details.map((detail) => (
                        <p key={detail} className="text-gray-500 text-sm">{detail}</p>
                      ))}
                      {item.action && (
                        <a href={item.action.href} className="inline-block mt-2 text-[#1db954] text-sm font-semibold hover:underline">
                          {item.action.label} →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <div className="mb-10">
                <h3 className="font-bold text-[#0a3d1a] mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/share/1PJZjsTAEf/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#1877F2] hover:bg-[#1565d8] text-white flex items-center justify-center transition-all duration-300 shadow-md" aria-label="Facebook">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@dogpoocrew" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-all duration-300 shadow-md" aria-label="TikTok">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Map */}
              {/* Real Google Maps embed — Niagara Region */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg h-64 sm:h-72">
                <iframe
                  title="Niagara Region Service Area"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d185552.6!2d-79.3!3d43.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d34c9ec993deb7%3A0x3f9e4e3b8b8b8b8b!2sNiagara%20Region%2C%20Ontario%2C%20Canada!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div id="quote" className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 scroll-mt-28">
                <span className="text-[#1db954] font-semibold text-sm uppercase tracking-widest">Get a Quote</span>
                <h2 className="text-2xl font-bold text-[#0a3d1a] mt-2 mb-2">Request a Quote</h2>
                <p className="text-gray-500 text-sm mb-8">
                  Fill out the form and we&apos;ll get back to you within 24 hours with a quote.
                </p>
                <Suspense fallback={<div className="h-96 flex items-center justify-center text-gray-400 text-sm">Loading form...</div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Quick Contact Banner ── */}
      <section className="py-16 bg-[#0a2e12] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(34,197,94,0.1),transparent)]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-3">Prefer to Call or Text?</h2>
            <p className="text-white/60 mb-8">We&apos;re happy to chat! Reach out directly for a quick response.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+12897881319" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1db954] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                <Phone className="w-5 h-5" />
                Call / Text 289-788-1319
              </a>
              <a href="sms:+12897881319" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                <MessageCircle className="w-5 h-5" />
                Text Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  )
}
