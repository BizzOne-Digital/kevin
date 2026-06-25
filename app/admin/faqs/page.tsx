"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react"

interface FAQ { _id: string; question: string; answer: string; order: number; active: boolean }
const EMPTY: Omit<FAQ, "_id"> = { question: "", answer: "", order: 0, active: true }

export default function AdminFAQsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [items, setItems] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<Partial<FAQ> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login") }, [status, router])

  useEffect(() => {
    if (status === "authenticated")
      fetch("/api/faqs").then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [status])

  const openNew  = () => { setEditItem({ ...EMPTY }); setIsNew(true) }
  const openEdit = (f: FAQ) => { setEditItem({ ...f }); setIsNew(false) }
  const close    = () => { setEditItem(null); setIsNew(false) }

  const save = async () => {
    if (!editItem) return
    setSaving(true)
    const method = isNew ? "POST" : "PUT"
    const url    = isNew ? "/api/faqs" : `/api/faqs/${editItem._id}`
    const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editItem) })
    const saved  = await res.json()
    if (isNew) setItems(p => [...p, saved])
    else setItems(p => p.map(x => x._id === saved._id ? saved : x))
    setSaving(false); close()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return
    await fetch(`/api/faqs/${id}`, { method: "DELETE" })
    setItems(p => p.filter(x => x._id !== id))
  }

  const setField = (k: string, v: any) => setEditItem(p => p ? { ...p, [k]: v } : p)

  if (loading) return <AdminShell><div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#6dd400]" /></div></AdminShell>

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">FAQs</h1>
            <p className="text-white/40 text-sm mt-1">{items.length} questions</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#1db954] hover:bg-[#18a048] text-white rounded-xl text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>

        <div className="space-y-2">
          {items.map(f => (
            <div key={f._id} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{f.question}</p>
                <p className="text-white/40 text-xs mt-1 line-clamp-2">{f.answer}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${f.active ? "bg-green-500/15 text-green-400" : "bg-white/10 text-white/40"}`}>
                {f.active ? "Active" : "Hidden"}
              </span>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(f)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(f._id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e2a18] border border-white/10 rounded-2xl w-full max-w-lg my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold">{isNew ? "Add FAQ" : "Edit FAQ"}</h2>
              <button onClick={close} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-white/50 text-xs block mb-1">Question</label>
                <input value={editItem.question || ""} onChange={e => setField("question", e.target.value)}
                  placeholder="How does the free first visit work?"
                  className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]" />
              </div>
              <div>
                <label className="text-white/50 text-xs block mb-1">Answer</label>
                <textarea value={editItem.answer || ""} rows={4} onChange={e => setField("answer", e.target.value)}
                  placeholder="Write your answer here..."
                  className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#1db954]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs block mb-1">Order</label>
                  <input type="number" value={editItem.order || 0} onChange={e => setField("order", Number(e.target.value))}
                    className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editItem.active ?? true} onChange={e => setField("active", e.target.checked)} className="accent-[#1db954] w-4 h-4" />
                    <span className="text-white/60 text-sm">Active</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
              <button onClick={close} className="px-4 py-2 rounded-xl text-white/50 hover:text-white text-sm">Cancel</button>
              <button onClick={save} disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-[#1db954] hover:bg-[#18a048] text-white rounded-xl text-sm font-semibold disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
