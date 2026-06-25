"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import { Trash2, ChevronDown, Phone, Mail, MessageSquare, Loader2 } from "lucide-react"

type Status = "new" | "contacted" | "booked" | "closed"

interface Submission {
  _id: string
  name: string
  phone: string
  email: string
  service: string
  message: string
  status: Status
  notes: string
  createdAt: string
}

const STATUS_STYLES: Record<Status, string> = {
  new:       "bg-amber-500/15 text-amber-400 border-amber-500/30",
  contacted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  booked:    "bg-green-500/15 text-green-400 border-green-500/30",
  closed:    "bg-white/10 text-white/40 border-white/20",
}

export default function SubmissionsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Status | "all">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login")
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/submissions").then(r => r.json()).then(data => {
        setSubmissions(data)
        setLoading(false)
      })
    }
  }, [status])

  const updateStatus = async (id: string, newStatus: Status) => {
    setSaving(id)
    await fetch(`/api/submissions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    setSubmissions(prev => prev.map(s => s._id === id ? { ...s, status: newStatus } : s))
    setSaving(null)
  }

  const saveNotes = async (id: string, notes: string) => {
    setSaving(id)
    await fetch(`/api/submissions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    })
    setSaving(null)
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission?")) return
    await fetch(`/api/submissions/${id}`, { method: "DELETE" })
    setSubmissions(prev => prev.filter(s => s._id !== id))
  }

  const filtered = filter === "all" ? submissions : submissions.filter(s => s.status === filter)

  if (loading) return (
    <AdminShell>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-[#6dd400]" />
      </div>
    </AdminShell>
  )

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Submissions</h1>
            <p className="text-white/40 text-sm mt-1">{submissions.length} total enquiries</p>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "new", "contacted", "booked", "closed"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === f ? "bg-[#1db954] text-white" : "bg-white/5 text-white/50 hover:text-white"
                }`}>
                {f}
                <span className="ml-1.5 opacity-60">
                  {f === "all" ? submissions.length : submissions.filter(s => s.status === f).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/30">No submissions found.</div>
          )}
          {filtered.map(sub => (
            <div key={sub._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Header row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/3 transition-colors"
                onClick={() => setExpandedId(expandedId === sub._id ? null : sub._id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-semibold text-sm">{sub.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLES[sub.status]}`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5 truncate">
                    {sub.service || "General enquiry"} · {new Date(sub.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform ${expandedId === sub._id ? "rotate-180" : ""}`} />
              </div>

              {/* Expanded detail */}
              {expandedId === sub._id && (
                <div className="border-t border-white/8 px-5 py-5 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <a href={`tel:${sub.phone}`} className="flex items-center gap-2 text-white/70 hover:text-[#6dd400] text-sm transition-colors">
                        <Phone className="w-3.5 h-3.5" /> {sub.phone}
                      </a>
                      {sub.email && (
                        <a href={`mailto:${sub.email}`} className="flex items-center gap-2 text-white/70 hover:text-[#6dd400] text-sm transition-colors">
                          <Mail className="w-3.5 h-3.5" /> {sub.email}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="text-white/40 text-xs block mb-1">Update Status</label>
                      <div className="flex items-center gap-2">
                        <select
                          value={sub.status}
                          onChange={e => updateStatus(sub._id, e.target.value as Status)}
                          className="bg-white/10 border border-white/15 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1db954]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="booked">Booked</option>
                          <option value="closed">Closed</option>
                        </select>
                        {saving === sub._id && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6dd400]" />}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-white/40 text-xs mb-1 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Message</p>
                    <p className="text-white/80 text-sm bg-white/5 rounded-xl px-4 py-3">{sub.message}</p>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs block mb-1">Internal Notes</label>
                    <textarea
                      defaultValue={sub.notes}
                      rows={2}
                      placeholder="Add notes about this lead..."
                      onBlur={e => saveNotes(sub._id, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white/80 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#1db954] placeholder:text-white/20"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button onClick={() => deleteSubmission(sub._id)}
                      className="flex items-center gap-1.5 text-red-400/60 hover:text-red-400 text-xs transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
