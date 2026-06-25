"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import { Loader2, Check, Plus, X, AlertCircle } from "lucide-react"

interface Settings {
  _id?: string
  // Business
  businessName: string; tagline: string; phone: string; email: string
  address: string; hoursWeekday: string; hoursWeekend: string
  announcementBar: string
  // Social
  facebookUrl: string; tiktokUrl: string
  // SEO
  metaTitle: string; metaDescription: string
  // Service areas
  serviceAreas: string[]
  // Hero buttons
  heroPrimaryLabel: string; heroPrimaryUrl: string
  heroSecondaryLabel: string; heroSecondaryUrl: string
  // Navbar
  navBookLabel: string; navBookUrl: string
  // CTA Section
  ctaHeading: string; ctaSubtext: string
  ctaPrimaryLabel: string; ctaPrimaryUrl: string
  ctaSecondaryLabel: string; ctaSecondaryUrl: string
  ctaFooterNote: string
  // Floating CTA
  floatingCallLabel: string; floatingTextLabel: string
  // Mobile bar
  mobileBarCallLabel: string; mobileBarBookLabel: string; mobileBarBookUrl: string
  // Footer
  footerBookLabel: string; footerBookUrl: string
}

const DEFAULT: Settings = {
  businessName: "Niagara Pet Waste Removal", tagline: "Niagara's #1 Pet Waste Removal Service",
  phone: "289-788-1319", email: "dogpoopcrew@gmail.com",
  address: "16 Empire St, Welland, ON L3B 2L2, Canada",
  hoursWeekday: "Mon–Sat: 8am – 6pm", hoursWeekend: "Sunday: Closed",
  announcementBar: "🐾  Formerly Dog Poo Crew  ✦  FREE First Visit with any 4-week commitment",
  facebookUrl: "https://www.facebook.com/share/1PJZjsTAEf/",
  tiktokUrl: "https://www.tiktok.com/@dogpoocrew",
  metaTitle: "Niagara Pet Waste Removal | Professional Yard Cleaning Services",
  metaDescription: "Niagara's #1 pet waste removal service. Keeping yards clean, one scoop at a time.",
  serviceAreas: ["Niagara-on-the-Lake","St. Catharines","Niagara Falls","Port Colborne","Welland","Thorold","Pelham","Fort Erie","Grimsby","Lincoln","West Lincoln","Wainfleet"],
  heroPrimaryLabel: "Get Free Visit",   heroPrimaryUrl: "/contact",
  heroSecondaryLabel: "289-788-1319",   heroSecondaryUrl: "tel:+12897881319",
  navBookLabel: "Book Now",             navBookUrl: "/contact#quote",
  ctaHeading: "Ready for a Cleaner Yard?",
  ctaSubtext: "Join hundreds of happy pet owners in Niagara. Get started with your FREE first visit!",
  ctaPrimaryLabel: "Book Now",          ctaPrimaryUrl: "/contact#quote",
  ctaSecondaryLabel: "289-788-1319",    ctaSecondaryUrl: "tel:+12897881319",
  ctaFooterNote: "No contracts required • Cancel anytime • 100% satisfaction guarantee",
  floatingCallLabel: "289-788-1319",    floatingTextLabel: "Text Us",
  mobileBarCallLabel: "289-788-1319",   mobileBarBookLabel: "Book Now", mobileBarBookUrl: "/contact#quote",
  footerBookLabel: "Book Free Visit",   footerBookUrl: "/contact",
}

export default function AdminSettingsPage() {
  const { status } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>(DEFAULT)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState("")

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login") }, [status, router])

  useEffect(() => {
    if (status === "authenticated")
      fetch("/api/settings").then(r => r.json()).then(d => { setSettings({ ...DEFAULT, ...d }); setLoading(false) })
  }, [status])

  const set = (k: keyof Settings, v: any) => setSettings(p => ({ ...p, [k]: v }))

  const setArea    = (i: number, v: string) => { const a = [...settings.serviceAreas]; a[i] = v; set("serviceAreas", a) }
  const addArea    = () => set("serviceAreas", [...settings.serviceAreas, ""])
  const removeArea = (i: number) => set("serviceAreas", settings.serviceAreas.filter((_, idx) => idx !== i))

  const save = async () => {
    setSaving(true); setError("")
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error("Save failed")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError("Failed to save. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <AdminShell>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-[#6dd400]" />
      </div>
    </AdminShell>
  )

  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Site Settings</h1>
            <p className="text-white/40 text-sm mt-1">Edit all global content, buttons and URLs from here</p>
          </div>
          <button onClick={save} disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60
              ${saved ? "bg-green-600 text-white" : "bg-[#1db954] hover:bg-[#18a048] text-white"}`}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-5">

          {/* ── Business Info ── */}
          <Section title="Business Info">
            <Grid2>
              <Field label="Business Name"  value={settings.businessName}  onChange={v => set("businessName", v)} />
              <Field label="Tagline"        value={settings.tagline}       onChange={v => set("tagline", v)} />
              <Field label="Phone"          value={settings.phone}         onChange={v => set("phone", v)} placeholder="289-788-1319" />
              <Field label="Email"          value={settings.email}         onChange={v => set("email", v)} type="email" />
            </Grid2>
            <Field label="Address" value={settings.address} onChange={v => set("address", v)} />
            <Grid2>
              <Field label="Weekday Hours" value={settings.hoursWeekday} onChange={v => set("hoursWeekday", v)} placeholder="Mon–Sat: 8am – 6pm" />
              <Field label="Weekend Hours" value={settings.hoursWeekend} onChange={v => set("hoursWeekend", v)} placeholder="Sunday: Closed" />
            </Grid2>
          </Section>

          {/* ── Announcement Bar ── */}
          <Section title="Scrolling Announcement Bar">
            <TextArea label="Announcement Text" value={settings.announcementBar} onChange={v => set("announcementBar", v)}
              hint="This scrolls across the top of every page" />
          </Section>

          {/* ── Hero Buttons ── */}
          <Section title="Hero Section Buttons">
            <p className="text-white/30 text-xs -mt-1 mb-2">The two buttons displayed on the homepage hero banner</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <BtnPair
                label="Primary Button (green)"
                btnLabel={settings.heroPrimaryLabel}   btnUrl={settings.heroPrimaryUrl}
                onLabel={v => set("heroPrimaryLabel", v)} onUrl={v => set("heroPrimaryUrl", v)}
                urlHint="e.g. /contact"
              />
              <BtnPair
                label="Secondary Button (phone)"
                btnLabel={settings.heroSecondaryLabel} btnUrl={settings.heroSecondaryUrl}
                onLabel={v => set("heroSecondaryLabel", v)} onUrl={v => set("heroSecondaryUrl", v)}
                urlHint="e.g. tel:+12897881319"
              />
            </div>
          </Section>

          {/* ── Navbar Button ── */}
          <Section title="Navbar Book Button">
            <p className="text-white/30 text-xs -mt-1 mb-2">The green "Book Now" button in the top navigation bar</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Button Label" value={settings.navBookLabel} onChange={v => set("navBookLabel", v)} placeholder="Book Now" />
              <Field label="Button URL"   value={settings.navBookUrl}   onChange={v => set("navBookUrl", v)}   placeholder="/contact#quote" />
            </div>
          </Section>

          {/* ── CTA Section ── */}
          <Section title="CTA Section (bottom of every page)">
            <Field label="Heading" value={settings.ctaHeading} onChange={v => set("ctaHeading", v)} />
            <TextArea label="Subtext" value={settings.ctaSubtext} onChange={v => set("ctaSubtext", v)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <BtnPair
                label="Primary Button"
                btnLabel={settings.ctaPrimaryLabel}   btnUrl={settings.ctaPrimaryUrl}
                onLabel={v => set("ctaPrimaryLabel", v)} onUrl={v => set("ctaPrimaryUrl", v)}
                urlHint="e.g. /contact#quote"
              />
              <BtnPair
                label="Secondary Button"
                btnLabel={settings.ctaSecondaryLabel} btnUrl={settings.ctaSecondaryUrl}
                onLabel={v => set("ctaSecondaryLabel", v)} onUrl={v => set("ctaSecondaryUrl", v)}
                urlHint="e.g. tel:+12897881319"
              />
            </div>
            <Field label="Footer Note (small text under buttons)" value={settings.ctaFooterNote} onChange={v => set("ctaFooterNote", v)}
              placeholder="No contracts required • Cancel anytime" />
          </Section>

          {/* ── Floating CTA (desktop) ── */}
          <Section title="Floating Buttons (desktop, bottom-right)">
            <p className="text-white/30 text-xs -mt-1 mb-2">The two floating green buttons on desktop screens</p>
            <Grid2>
              <Field label="Call Button Label" value={settings.floatingCallLabel} onChange={v => set("floatingCallLabel", v)} placeholder="289-788-1319" />
              <Field label="Text Button Label" value={settings.floatingTextLabel} onChange={v => set("floatingTextLabel", v)} placeholder="Text Us" />
            </Grid2>
          </Section>

          {/* ── Mobile Sticky Bar ── */}
          <Section title="Mobile Sticky Bar (bottom of screen on mobile)">
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Call Label"    value={settings.mobileBarCallLabel} onChange={v => set("mobileBarCallLabel", v)} placeholder="289-788-1319" />
              <Field label="Book Label"    value={settings.mobileBarBookLabel} onChange={v => set("mobileBarBookLabel", v)} placeholder="Book Now" />
              <Field label="Book URL"      value={settings.mobileBarBookUrl}   onChange={v => set("mobileBarBookUrl", v)}   placeholder="/contact#quote" />
            </div>
          </Section>

          {/* ── Footer Book Button ── */}
          <Section title="Footer Book Button">
            <Grid2>
              <Field label="Button Label" value={settings.footerBookLabel} onChange={v => set("footerBookLabel", v)} placeholder="Book Free Visit" />
              <Field label="Button URL"   value={settings.footerBookUrl}   onChange={v => set("footerBookUrl", v)}   placeholder="/contact" />
            </Grid2>
          </Section>

          {/* ── Social Media ── */}
          <Section title="Social Media URLs">
            <Grid2>
              <Field label="Facebook URL" value={settings.facebookUrl} onChange={v => set("facebookUrl", v)} placeholder="https://facebook.com/..." />
              <Field label="TikTok URL"   value={settings.tiktokUrl}   onChange={v => set("tiktokUrl", v)}   placeholder="https://tiktok.com/@..." />
            </Grid2>
          </Section>

          {/* ── SEO ── */}
          <Section title="SEO / Meta Tags">
            <Field label="Meta Title" value={settings.metaTitle} onChange={v => set("metaTitle", v)} />
            <TextArea label="Meta Description" value={settings.metaDescription} onChange={v => set("metaDescription", v)} />
          </Section>

          {/* ── Service Areas ── */}
          <Section title="Service Areas (shown in footer & service area section)">
            <div className="grid sm:grid-cols-2 gap-2">
              {settings.serviceAreas.map((area, i) => (
                <div key={i} className="flex gap-2">
                  <input value={area} onChange={e => setArea(i, e.target.value)}
                    className="flex-1 bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954] transition-colors" />
                  <button onClick={() => removeArea(i)} className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addArea} className="flex items-center gap-1.5 text-[#6dd400] text-sm hover:underline mt-1">
              <Plus className="w-3.5 h-3.5" /> Add Area
            </button>
          </Section>

        </div>

        {/* Bottom save bar */}
        <div className="sticky bottom-0 bg-[#0a1a10]/90 backdrop-blur-sm border-t border-white/8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mt-6 flex items-center justify-between gap-4">
          {error && <p className="text-red-400 text-xs">{error}</p>}
          {!error && saved && <p className="text-green-400 text-xs flex items-center gap-1"><Check className="w-3.5 h-3.5" /> All changes saved</p>}
          {!error && !saved && <p className="text-white/20 text-xs">Changes are not saved until you click Save</p>}
          <button onClick={save} disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60 flex-shrink-0
              ${saved ? "bg-green-600 text-white" : "bg-[#1db954] hover:bg-[#18a048] text-white"}`}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save All Changes"}
          </button>
        </div>
      </div>
    </AdminShell>
  )
}

/* ─── Sub-components ────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-white/8 bg-white/3">
        <h2 className="text-white/70 text-xs uppercase tracking-widest font-semibold">{title}</h2>
      </div>
      <div className="px-5 py-4 space-y-3">{children}</div>
    </div>
  )
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-3">{children}</div>
}

function Field({ label, value, onChange, type = "text", placeholder = "", hint = "" }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; hint?: string
}) {
  return (
    <div>
      <label className="text-white/50 text-xs block mb-1">{label}</label>
      <input type={type} value={value || ""} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1db954] transition-colors placeholder:text-white/20" />
      {hint && <p className="text-white/25 text-xs mt-1">{hint}</p>}
    </div>
  )
}

function TextArea({ label, value, onChange, hint = "" }: {
  label: string; value: string; onChange: (v: string) => void; hint?: string
}) {
  return (
    <div>
      <label className="text-white/50 text-xs block mb-1">{label}</label>
      <textarea value={value || ""} rows={2} onChange={e => onChange(e.target.value)}
        className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#1db954] transition-colors" />
      {hint && <p className="text-white/25 text-xs mt-1">{hint}</p>}
    </div>
  )
}

function BtnPair({ label, btnLabel, btnUrl, onLabel, onUrl, urlHint = "" }: {
  label: string; btnLabel: string; btnUrl: string
  onLabel: (v: string) => void; onUrl: (v: string) => void; urlHint?: string
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
      <p className="text-white/40 text-xs font-medium uppercase tracking-wide">{label}</p>
      <div>
        <label className="text-white/30 text-xs block mb-1">Button Text</label>
        <input value={btnLabel || ""} onChange={e => onLabel(e.target.value)} placeholder="Button Text"
          className="w-full bg-white/8 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1db954] transition-colors" />
      </div>
      <div>
        <label className="text-white/30 text-xs block mb-1">URL / Link</label>
        <input value={btnUrl || ""} onChange={e => onUrl(e.target.value)} placeholder={urlHint || "https://..."}
          className="w-full bg-white/8 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1db954] transition-colors" />
        {urlHint && <p className="text-white/20 text-xs mt-0.5">{urlHint}</p>}
      </div>
    </div>
  )
}
