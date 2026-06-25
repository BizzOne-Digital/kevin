import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import Submission from "@/lib/models/Submission"
import AdminShell from "@/components/admin/AdminShell"
import Link from "next/link"
import {
  MessageSquare,
  Wrench,
  DollarSign,
  Star,
  HelpCircle,
  Settings,
  ArrowRight,
  TrendingUp,
} from "lucide-react"

async function getStats() {
  await connectDB()
  const total      = await Submission.countDocuments()
  const newCount   = await Submission.countDocuments({ status: "new" })
  const booked     = await Submission.countDocuments({ status: "booked" })
  const recent     = await Submission.find().sort({ createdAt: -1 }).limit(5).lean()
  return { total, newCount, booked, recent }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const { total, newCount, booked, recent } = await getStats()

  const cards = [
    { label: "Total Submissions", value: total,    icon: MessageSquare, href: "/admin/submissions", color: "from-blue-500/20 to-blue-600/10",  border: "border-blue-500/20" },
    { label: "New / Unread",      value: newCount,  icon: TrendingUp,    href: "/admin/submissions", color: "from-amber-500/20 to-amber-600/10", border: "border-amber-500/20" },
    { label: "Bookings",          value: booked,    icon: Star,          href: "/admin/submissions", color: "from-[#1db954]/20 to-[#6dd400]/10", border: "border-[#1db954]/20" },
  ]

  const quickLinks = [
    { label: "Manage Services",     icon: Wrench,       href: "/admin/services" },
    { label: "Manage Pricing",      icon: DollarSign,   href: "/admin/pricing" },
    { label: "Manage Testimonials", icon: Star,         href: "/admin/testimonials" },
    { label: "Manage FAQs",         icon: HelpCircle,   href: "/admin/faqs" },
    { label: "Site Settings",       icon: Settings,     href: "/admin/settings" },
  ]

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome back, {session.user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-white/40 text-sm mt-1">Here's what's happening with your business.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {cards.map(c => (
            <Link key={c.label} href={c.href}
              className={`bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-5 hover:scale-[1.02] transition-transform`}>
              <div className="flex items-center justify-between mb-3">
                <c.icon className="w-5 h-5 text-white/60" />
                <ArrowRight className="w-4 h-4 text-white/30" />
              </div>
              <div className="text-3xl font-bold text-white">{c.value}</div>
              <div className="text-white/50 text-sm mt-1">{c.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent submissions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <h2 className="text-white font-semibold text-sm">Recent Submissions</h2>
              <Link href="/admin/submissions" className="text-[#6dd400] text-xs hover:underline">View all →</Link>
            </div>
            <div className="divide-y divide-white/5">
              {recent.length === 0 && (
                <p className="text-white/30 text-sm text-center py-8">No submissions yet.</p>
              )}
              {(recent as any[]).map(sub => (
                <div key={sub._id.toString()} className="px-5 py-3.5 hover:bg-white/3 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{sub.name}</p>
                      <p className="text-white/40 text-xs truncate">{sub.service || "General enquiry"}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                      sub.status === "new"       ? "bg-amber-500/15 text-amber-400" :
                      sub.status === "contacted" ? "bg-blue-500/15 text-blue-400"  :
                      sub.status === "booked"    ? "bg-green-500/15 text-green-400" :
                      "bg-white/10 text-white/40"
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-white/25 text-xs mt-0.5">
                    {new Date(sub.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8">
              <h2 className="text-white font-semibold text-sm">Quick Actions</h2>
            </div>
            <div className="p-3 space-y-1">
              {quickLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all group">
                  <div className="flex items-center gap-3">
                    <l.icon className="w-4 h-4 text-[#6dd400]" />
                    <span className="text-sm">{l.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
