"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSiteSettings } from "@/lib/useSiteSettings"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { settings } = useSiteSettings()

  const phoneHref = settings.heroSecondaryUrl.startsWith("tel:") ? settings.heroSecondaryUrl : `tel:${settings.phone.replace(/\D/g,"")}`
  const marqueeText = `${settings.announcementBar}                    ✦                    ${settings.announcementBar}                    ✦`

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* ── Marquee Bar ── */}
      <div className="bg-gradient-to-r from-[#1db954] to-[#6dd400] text-white py-2 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-xs sm:text-sm font-medium tracking-wide px-4">{marqueeText}</span>
          <span className="text-xs sm:text-sm font-medium tracking-wide px-4" aria-hidden>{marqueeText}</span>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white shadow-[0_2px_24px_rgba(0,0,0,0.10)] border-b border-gray-100"
            : "bg-white/98 backdrop-blur-md"
        )}
      >
        {/* Top accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#1db954] to-[#6dd400]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Height: 72px mobile, 88px desktop */}
          <div className="flex h-[72px] sm:h-[96px] lg:h-[108px] items-center justify-between gap-3">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 sm:gap-4 group flex-shrink-0">
              {/* Logo — large, no clipping, white bg so it pops */}
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-lg ring-2 ring-[#1db954]/25 group-hover:ring-[#1db954]/60 group-hover:shadow-xl transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="Niagara Pet Waste Removal"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 56px, (max-width: 1024px) 80px, 96px"
                  priority
                />
              </div>
              {/* Brand name */}
              <div className="hidden sm:block leading-tight">
                <span className="font-extrabold text-[#1db954] text-lg sm:text-xl lg:text-2xl block tracking-tight">
                  Niagara
                </span>
                <span className="text-gray-400 text-[10px] sm:text-xs lg:text-sm font-semibold uppercase tracking-widest">
                  Pet Waste Removal
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav — hidden below md ── */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 lg:px-4 py-2 text-sm lg:text-base font-semibold rounded-lg transition-all duration-200 whitespace-nowrap",
                      active
                        ? "text-[#1db954] bg-green-50"
                        : "text-gray-600 hover:text-[#1db954] hover:bg-green-50"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-[#1db954] to-[#6dd400]"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Desktop CTA — hidden below md ── */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
              <a
                href={phoneHref}
                className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 lg:py-2.5 text-sm lg:text-base font-bold text-[#1db954] border-2 border-[#1db954]/30 rounded-xl hover:border-[#1db954] hover:bg-green-50 transition-all duration-200 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />
                <span className="hidden lg:inline">{settings.phone}</span>
                <span className="lg:hidden">Call</span>
              </a>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white shadow-lg shadow-green-500/20 h-9 lg:h-10 px-4 lg:px-5 text-sm lg:text-base font-bold rounded-xl whitespace-nowrap"
                asChild
              >
                <Link href={settings.navBookUrl}>{settings.navBookLabel}</Link>
              </Button>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-green-50 transition-colors flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen
                ? <X className="w-6 h-6 text-[#1db954]" />
                : <Menu className="w-6 h-6 text-[#1db954]" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-4 py-3 text-base font-semibold rounded-xl transition-colors",
                        active
                          ? "bg-green-50 text-[#1db954]"
                          : "text-gray-700 hover:bg-green-50 hover:text-[#1db954]"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
                  <a
                    href={phoneHref}
                    className="flex items-center justify-center gap-2 py-3 text-base font-bold text-[#1db954] border-2 border-[#1db954]/30 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {settings.phone}
                  </a>
                  <Button
                    className="w-full bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white font-bold rounded-xl h-12 text-base"
                    asChild
                  >
                    <Link href={settings.navBookUrl}>{settings.navBookLabel}</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
