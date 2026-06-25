import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { CTASection } from "@/components/sections/cta-section"
import { Button } from "@/components/ui/button"
import { Calendar, Sparkles, Droplets, Trash2, Check, ArrowRight } from "lucide-react"
import { connectDB } from "@/lib/mongodb"
import ServiceModel from "@/lib/models/Service"

// Icon map — DB stores the name, we map to the component
const ICON_MAP: Record<string, any> = {
  Calendar, Sparkles, Droplets, Trash2,
}

async function getServices() {
  try {
    await connectDB()
    const services = await ServiceModel.find({ active: true }).sort({ order: 1 }).lean()
    return JSON.parse(JSON.stringify(services))
  } catch {
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <main className="min-h-screen bg-white pb-20 md:pb-0">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[380px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        <Image src="/images/clean-yard.jpg" alt="Professional pet waste removal service" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e12]/95 via-[#0f3d1a]/85 to-[#0f3d1a]/40" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="text-[#6dd400] font-semibold text-xs sm:text-sm uppercase tracking-widest block mb-3 sm:mb-4">Our Services</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Professional Pet Waste{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] to-[#6dd400]">Solutions</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-10">
              Reliable, friendly, and fully insured commercial and residential services — helping homeowners and businesses maintain clean, safe, and enjoyable outdoor spaces.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {services.map((s: any) => {
                const Icon = ICON_MAP[s.icon] || Calendar
                return (
                  <a key={s.id} href={`#${s.id}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all duration-200 backdrop-blur-sm">
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#6dd400]" />
                    {s.subtitle}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {services.map((service: any, index: number) => {
              const Icon = ICON_MAP[service.icon] || Calendar
              return (
                <div key={service.id} id={service.id}
                  className={`scroll-mt-24 py-12 sm:py-16 lg:py-24 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}>
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
                      {/* Image */}
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group">
                          <Image src={service.image} alt={service.title} width={800} height={500}
                            className="w-full h-52 sm:h-72 lg:h-[360px] object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e12]/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 sm:gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#1db954] to-[#6dd400] flex items-center justify-center shadow-lg">
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <span className="text-white font-bold text-sm sm:text-base drop-shadow">{service.subtitle}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-[#1db954] text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
                          {service.subtitle}
                        </span>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a3d1a] mb-3 sm:mb-4 leading-tight">{service.title}</h2>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">{service.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                          {service.features.map((feature: string) => (
                            <div key={feature} className="flex items-start gap-2 sm:gap-3">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1db954]" />
                              </div>
                              <span className="text-gray-600 text-xs sm:text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                          {service.pricing.map((price: any) => (
                            <div key={price.plan} className="bg-gray-900 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-4 border border-gray-800">
                              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{price.plan}</div>
                              <div className="text-base sm:text-xl font-bold text-white leading-tight">{price.price}</div>
                              <div className="text-gray-500 text-xs mt-1">{price.desc}</div>
                            </div>
                          ))}
                        </div>

                        <Button size="lg"
                          className="bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white shadow-lg shadow-emerald-900/30 gap-2 h-11 sm:h-12 px-6 sm:px-8 font-semibold w-full sm:w-auto"
                          asChild>
                          <Link href={`/contact?service=${service.serviceValue}`}>
                            Book This Service <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
