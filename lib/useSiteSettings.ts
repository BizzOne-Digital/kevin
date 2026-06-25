"use client"

import { useEffect, useState } from "react"

export interface SiteSettings {
  businessName: string
  tagline: string
  phone: string
  email: string
  address: string
  hoursWeekday: string
  hoursWeekend: string
  announcementBar: string
  facebookUrl: string
  tiktokUrl: string
  metaTitle: string
  metaDescription: string
  serviceAreas: string[]
  // Hero
  heroPrimaryLabel: string
  heroPrimaryUrl: string
  heroSecondaryLabel: string
  heroSecondaryUrl: string
  // Navbar
  navBookLabel: string
  navBookUrl: string
  // CTA Section
  ctaHeading: string
  ctaSubtext: string
  ctaPrimaryLabel: string
  ctaPrimaryUrl: string
  ctaSecondaryLabel: string
  ctaSecondaryUrl: string
  ctaFooterNote: string
  // Floating CTA
  floatingCallLabel: string
  floatingTextLabel: string
  // Mobile bar
  mobileBarCallLabel: string
  mobileBarBookLabel: string
  mobileBarBookUrl: string
  // Footer
  footerBookLabel: string
  footerBookUrl: string
}

export const DEFAULT_SETTINGS: SiteSettings = {
  businessName: "Niagara Pet Waste Removal",
  tagline: "Niagara's #1 Pet Waste Removal Service",
  phone: "289-788-1319",
  email: "dogpoopcrew@gmail.com",
  address: "16 Empire St, Welland, ON L3B 2L2, Canada",
  hoursWeekday: "Mon–Sat: 8am – 6pm",
  hoursWeekend: "Sunday: Closed",
  announcementBar: "🐾  Formerly Dog Poo Crew  ✦  FREE First Visit with any 4-week commitment",
  facebookUrl: "https://www.facebook.com/share/1PJZjsTAEf/",
  tiktokUrl: "https://www.tiktok.com/@dogpoocrew",
  metaTitle: "Niagara Pet Waste Removal | Professional Yard Cleaning Services",
  metaDescription: "Niagara's #1 pet waste removal service. Keeping yards clean, one scoop at a time.",
  serviceAreas: ["Niagara-on-the-Lake","St. Catharines","Niagara Falls","Port Colborne","Welland","Thorold","Pelham","Fort Erie","Grimsby","Lincoln","West Lincoln","Wainfleet"],
  heroPrimaryLabel: "Get Free Visit",
  heroPrimaryUrl: "/contact",
  heroSecondaryLabel: "289-788-1319",
  heroSecondaryUrl: "tel:+12897881319",
  navBookLabel: "Book Now",
  navBookUrl: "/contact#quote",
  ctaHeading: "Ready for a Cleaner Yard?",
  ctaSubtext: "Join hundreds of happy pet owners in Niagara. Get started with your FREE first visit!",
  ctaPrimaryLabel: "Book Now",
  ctaPrimaryUrl: "/contact#quote",
  ctaSecondaryLabel: "289-788-1319",
  ctaSecondaryUrl: "tel:+12897881319",
  ctaFooterNote: "No contracts required • Cancel anytime • 100% satisfaction guarantee",
  floatingCallLabel: "289-788-1319",
  floatingTextLabel: "Text Us",
  mobileBarCallLabel: "289-788-1319",
  mobileBarBookLabel: "Book Now",
  mobileBarBookUrl: "/contact#quote",
  footerBookLabel: "Book Free Visit",
  footerBookUrl: "/contact",
}

let cachedSettings: SiteSettings | null = null
let cacheTime = 0
const CACHE_TTL = 60_000 // 1 min client-side cache

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings ?? DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(!cachedSettings)

  useEffect(() => {
    const now = Date.now()
    if (cachedSettings && now - cacheTime < CACHE_TTL) {
      setSettings(cachedSettings)
      setLoading(false)
      return
    }
    fetch("/api/settings")
      .then(r => r.json())
      .then((data: SiteSettings) => {
        cachedSettings = { ...DEFAULT_SETTINGS, ...data }
        cacheTime = Date.now()
        setSettings(cachedSettings)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { settings, loading }
}
