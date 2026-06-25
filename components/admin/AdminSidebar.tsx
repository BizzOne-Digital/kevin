"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  MessageSquare,
  Wrench,
  DollarSign,
  Star,
  HelpCircle,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/admin",              label: "Dashboard",    icon: LayoutDashboard, exact: true },
  { href: "/admin/submissions",  label: "Submissions",  icon: MessageSquare },
  { href: "/admin/services",     label: "Services",     icon: Wrench },
  { href: "/admin/pricing",      label: "Pricing",      icon: DollarSign },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faqs",         label: "FAQs",         icon: HelpCircle },
  { href: "/admin/settings",     label: "Settings",     icon: Settings },
]

interface Props {
  onClose?: () => void
}

export default function AdminSidebar({ onClose }: Props) {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col h-full bg-[#071f0d] border-r border-white/8 w-64">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white flex-shrink-0">
            <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
          </div>
          <div className="leading-tight">
            <span className="text-white font-bold text-sm block">Niagara</span>
            <span className="text-[#6dd400] text-[10px] font-semibold uppercase tracking-widest">Admin</span>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white md:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[#1db954]/15 text-[#6dd400] border border-[#1db954]/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 border-t border-white/8 pt-4 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
