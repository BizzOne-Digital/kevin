"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react"

interface Plan {
  _id: string; name: string; price: string; period: string; description: string
  features: string[]; popular: boolean; badge: string | null; cta: string
  category: "main" | "addon"; order: number; active: boolean
}

const EMPTY: Omit<Plan, "_id"> = {
  name: "", price: "", period: "+", description: "", features: [""],
  popular: false, badge: null, cta: "Book Now", category: "main", order: 0, active: true,
}

export default function AdminPricingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<Partial<Plan> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login") }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/pricing").then(r => r.json()).then(d => { setPlans(d); setLoading(false) })
    }
  }, [status])

  const openNew  = () => { setEditItem({ ...EMPTY }); setIsNew(true) }
  const openEdit = (p: Plan) => { setEditItem({ ...p }); setIsNew(false) }
  const close    = () => { setEditItem(null); setIsNew(false) }

  const save = async () => {
    if (!editItem) return
    setSaving(true)
    const method = isNew ? "POST" : "PUT"
    const url    = isNew ? "/api/pricing" : `/api/pricing/${editItem._id}`
    const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editItem) })
    const saved  = await res.json()
    if (isNew) setPlans(p => [...p, saved])
    else setPlans(p => p.map(x => x._id === saved._id ? saved : x))
    setSaving(false)
    close()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this plan?")) return
    await fetch(`/api/pricing/${id}`, { method: "DELETE" })
    setPlans(p => p.filter(x => x._id !== id))
  }

  const setField   = (k: string, v: any) => setEditItem(p => p ? { ...p, [k]: v } : p)
  const setFeature = (i: number, v: string) => setEditItem(p => {
    if (!p) return p; const f = [...(p.features||[])]; f[i]=v; return { ...p, features: f }
  })
  const addFeature    = () => setEditItem(p => p ? { ...p, features: [...(p.features||[]), ""] } : p)
  const removeFeature = (i: number) => setEditItem(p => p ? { ...p, features: (p.features||[]).filter((_,idx)=>idx!==i) } : p)

  const main  = plans.filter(p => p.category === "main")
  const addon = plans.filter(p => p.category === "addon")

  if (loading) return <AdminShell><div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#6dd400]" /></div></AdminShell>

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Pricing</h1>
            <p className="text-white/40 text-sm mt-1">{plans.length} plans</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#1db954] hover:bg-[#18a048] text-white rounded-xl text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" /> Add Plan
          </button>
        </div>

        {[["Main Plans", main], ["Add-Ons", addon]].map(([label, list]) => (
          <div key={label as string} className="mb-6">
            <h2 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">{label as string}</h2>
            <div className="space-y-2">
              {(list as Plan[]).map(p => (
                <div key={p._id} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{p.name}</span>
                      {p.popular && <span className="text-xs px-2 py-0.5 rounded-full bg-[#1db954]/15 text-[#6dd400]">Popular</span>}
                      {p.badge && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">{p.badge}</span>}
                    </div>
                    <p className="text-white/40 text-xs mt-0.5">{p.price}{p.period} · {p.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.active ? "bg-green-500/15 text-green-400" : "bg-white/10 text-white/40"}`}>
                    {p.active ? "Active" : "Hidden"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => remove(p._id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
              {(list as Plan[]).length === 0 && <p className="text-white/20 text-sm text-center py-4">None yet.</p>}
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e2a18] border border-white/10 rounded-2xl w-full max-w-lg my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold">{isNew ? "Add Plan" : "Edit Plan"}</h2>
              <button onClick={close} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Plan Name", key: "name", ph: "Weekly" },
                  { label: "Price", key: "price", ph: "$23" },
                  { label: "Period", key: "period", ph: "+  or  /week" },
                  { label: "CTA Text", key: "cta", ph: "Book Now" },
                  { label: "Badge (optional)", key: "badge", ph: "Most Popular" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-white/50 text-xs block mb-1">{f.label}</label>
                    <input value={(editItem as any)[f.key] || ""} placeholder={f.ph}
                      onChange={e => setField(f.key, e.target.value || null)}
                      className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]" />
                  </div>
                ))}
                <div>
                  <label className="text-white/50 text-xs block mb-1">Category</label>
                  <select value={editItem.category || "main"} onChange={e => setField("category", e.target.value)}
                    className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]">
                    <option value="main">Main Plan</option>
                    <option value="addon">Add-On</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-white/50 text-xs block mb-1">Description</label>
                <input value={editItem.description || ""} onChange={e => setField("description", e.target.value)}
                  className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs block mb-1">Order</label>
                  <input type="number" value={editItem.order || 0} onChange={e => setField("order", Number(e.target.value))}
                    className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]" />
                </div>
                <div className="flex items-end gap-4 pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editItem.popular ?? false} onChange={e => setField("popular", e.target.checked)} className="accent-[#1db954] w-4 h-4" />
                    <span className="text-white/60 text-sm">Popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={editItem.active ?? true} onChange={e => setField("active", e.target.checked)} className="accent-[#1db954] w-4 h-4" />
                    <span className="text-white/60 text-sm">Active</span>
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/50 text-xs">Features</label>
                  <button onClick={addFeature} className="text-[#6dd400] text-xs hover:underline">+ Add</button>
                </div>
                <div className="space-y-2">
                  {(editItem.features || []).map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={f} onChange={e => setFeature(i, e.target.value)}
                        className="flex-1 bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]" />
                      <button onClick={() => removeFeature(i)} className="text-white/30 hover:text-red-400"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
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
