"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { useSiteSettings } from "@/lib/useSiteSettings"

export function FloatingCTA() {
  const { settings } = useSiteSettings()
  const phoneHref = settings.heroSecondaryUrl.startsWith("tel:") ? settings.heroSecondaryUrl : `tel:${settings.phone.replace(/\D/g,"")}`
  const smsHref   = phoneHref.replace("tel:", "sms:")

  return (
    <>
      {/* Desktop floating buttons */}
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-3 items-end">
        <motion.a href={phoneHref} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white pl-4 pr-5 h-14 rounded-full shadow-xl shadow-green-500/30 transition-all duration-200"
          aria-label={`Call ${settings.floatingCallLabel}`}>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-wide">{settings.floatingCallLabel}</span>
        </motion.a>

        <motion.a href={smsHref} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-gradient-to-r from-[#1db954] to-[#6dd400] hover:from-[#18a048] hover:to-[#5bbf00] text-white pl-4 pr-5 h-12 rounded-full shadow-xl shadow-green-500/30 transition-all duration-200"
          aria-label="Text us">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold">{settings.floatingTextLabel}</span>
        </motion.a>
      </motion.div>

      {/* Mobile sticky bottom bar */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
        <div className="flex gap-3 max-w-sm mx-auto">
          <a href={phoneHref}
            className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#1db954] to-[#6dd400] text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>{settings.mobileBarCallLabel}</span>
          </a>
          <a href={settings.mobileBarBookUrl}
            className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#1db954] to-[#6dd400] text-white font-bold text-sm text-center transition-colors">
            {settings.mobileBarBookLabel}
          </a>
        </div>
      </motion.div>
    </>
  )
}
