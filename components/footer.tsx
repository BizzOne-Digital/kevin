"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { useSiteSettings } from "@/lib/useSiteSettings"

const footerServices = [
  { href: "/services#weekly",    label: "Weekly & Bi-Weekly" },
  { href: "/services#onetime",   label: "One-Time Cleanups" },
  { href: "/services#sanitizer", label: "Sanitizer & Deodorizer" },
  { href: "/services#bucket",    label: "Bucket Service" },
]

const footerPages = [
  { href: "/",        label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing",  label: "Pricing" },
  { href: "/about",    label: "About Us" },
  { href: "/contact",  label: "Contact" },
]

export function Footer() {
  const { settings } = useSiteSettings()
  const phoneHref = settings.phone ? `tel:+1${settings.phone.replace(/\D/g, "")}` : "tel:+12897881319"
  const areas = settings.serviceAreas?.length ? settings.serviceAreas : [
    "Niagara-on-the-Lake","St. Catharines","Niagara Falls","Port Colborne",
    "Welland","Thorold","Pelham","Fort Erie","Grimsby","Lincoln","West Lincoln","Wainfleet",
  ]

  return (
    <footer className="bg-[#071f0d] text-white">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1db954] to-[#6dd400]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-white/20 group-hover:border-[#6dd400]/60 transition-all duration-300 shadow-lg p-0.5">
                <Image src="/logo.png" alt={settings.businessName} fill className="object-contain p-0.5" sizes="72px" />
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-white text-xl sm:text-2xl block">Niagara</span>
                <span className="text-[#6dd400] text-xs sm:text-sm font-semibold uppercase tracking-widest">Pet Waste Removal</span>
              </div>
            </Link>

            <p className="text-white/55 text-sm lg:text-base leading-relaxed mb-3 max-w-sm">
              Keeping yards clean, one scoop at a time. Reliable, friendly, and fully insured.
            </p>

            {/* Social links from settings */}
            <div className="flex gap-2.5 mb-4">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white/10 hover:bg-[#1877F2] border border-white/15 flex items-center justify-center transition-all duration-300" aria-label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {settings.tiktokUrl && (
                <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white/10 hover:bg-black border border-white/15 flex items-center justify-center transition-all duration-300" aria-label="TikTok">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Contact info — live from settings */}
            <ul className="space-y-2 lg:space-y-2.5">
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#6dd400]" />
                </div>
                <div className="min-w-0">
                  <a href={phoneHref} className="text-white/85 hover:text-white transition-colors text-sm lg:text-base font-bold block leading-tight">
                    {settings.phone}
                  </a>
                  <span className="text-white/35 text-xs">Call or Text</span>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#6dd400]" />
                </div>
                <a href={`mailto:${settings.email}`} className="text-white/70 hover:text-white transition-colors text-sm lg:text-base break-all min-w-0">
                  {settings.email}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#6dd400]" />
                </div>
                <div>
                  <span className="text-white/70 text-sm lg:text-base block leading-tight">{settings.hoursWeekday}</span>
                  <span className="text-white/35 text-xs">{settings.hoursWeekend}</span>
                </div>
              </li>

              {/* Book button — label/url from settings */}
              <li className="pt-1">
                <Link href={settings.footerBookUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white text-sm lg:text-base font-bold rounded-lg transition-all duration-200 shadow-md">
                  {settings.footerBookLabel} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-bold text-white text-xs lg:text-sm uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Pages</h3>
            <ul className="space-y-2.5 lg:space-y-3">
              {footerPages.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/55 hover:text-[#6dd400] transition-colors text-sm lg:text-base flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#6dd400]/40 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-xs lg:text-sm uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Services</h3>
            <ul className="space-y-2.5 lg:space-y-3">
              {footerServices.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/55 hover:text-[#6dd400] transition-colors text-sm lg:text-base flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#6dd400]/40 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/services" className="text-[#6dd400] hover:text-white transition-colors text-sm lg:text-base font-semibold">View all →</Link>
              </li>
            </ul>
          </div>

          {/* Service Areas — live from settings */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-white text-xs lg:text-sm uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Service Areas</h3>
            <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 gap-x-2 gap-y-2 lg:gap-y-2.5">
              {areas.map(area => (
                <li key={area} className="text-white/55 text-xs lg:text-sm flex items-center gap-1.5">
                  <MapPin className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#6dd400] flex-shrink-0" />
                  <span className="leading-tight truncate">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-xs lg:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
          </p>
          <p className="text-white/20 text-xs italic">Formerly Dog Poo Crew</p>
        </div>
      </div>
    </footer>
  )
}
