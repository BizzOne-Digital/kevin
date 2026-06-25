"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import { Plus, Pencil, Trash2, Loader2, X, Check, GripVertical } from "lucide-react"

interface ServicePricing { plan: string; price: string; desc: string }
interface Service {
  _id: string; id: string; icon: string; title: string; subtitle: string
  description: string; image: string; serviceValue: string
  features: string[]; pricing: ServicePricing[]; order: number; active: boolean
}

const EMPTY: Omit<Service, "_id"> = {
  id: "", icon: "Calendar", title: "", subtitle: "", description: "",
  image: "", serviceValue: "", features: [""], pricing: [{ plan: "", price: "", desc: "" }], order: 0, active: true,
}

export default function AdminServicesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<Partial<Service> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login") }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/services").then(r => r.json()).then(d => { setServices(d); setLoading(false) })
    }
  }, [status])

  const openNew = () => { setEditItem({ ...EMPTY }); setIsNew(true) }
  const openEdit = (s: Service) => { setEditItem({ ...s }); setIsNew(false) }
  const close = () => { setEditItem(null); setIsNew(false) }

  const save = async () => {
    if (!editItem) return
    setSaving(true)
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/services" : `/api/services/${editItem._id}`
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editItem) })
    const saved = await res.json()
    if (isNew) setServices(p => [...p, saved])
    else setServices(p => p.map(s => s._id === saved._id ? saved : s))
    setSaving(false)
    close()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return
    await fetch(`/api/services/${id}`, { method: "DELETE" })
    setServices(p => p.filter(s => s._id !== id))
  }

  const setField = (key: string, val: any) => setEditItem(p => p ? { ...p, [key]: val } : p)
  const setFeature = (i: number, val: string) => setEditItem(p => {
    if (!p) return p
    const f = [...(p.features || [])]
    f[i] = val
    return { ...p, features: f }
  })
  const addFeature = () => setEditItem(p => p ? { ...p, features: [...(p.features || []), ""] } : p)
  const removeFeature = (i: number) => setEditItem(p => p ? { ...p, features: (p.features || []).filter((_, idx) => idx !== i) } : p)
  const setPricing = (i: number, key: string, val: string) => setEditItem(p => {
    if (!p) return p
    const pr = [...(p.pricing || [])]
    pr[i] = { ...pr[i], [key]: val }
    return { ...p, pricing: pr }
  })
  const addPricing = () => setEditItem(p => p ? { ...p, pricing: [...(p.pricing || []), { plan: "", price: "", desc: "" }] } : p)
  const removePricing = (i: number) => setEditItem(p => p ? { ...p, pricing: (p.pricing || []).filter((_, idx) => idx !== i) } : p)

  if (loading) return <AdminShell><div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#6dd400]" /></div></AdminShell>

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Services</h1>
            <p className="text-white/40 text-sm mt-1">{services.length} services</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-[#1db954] hover:bg-[#18a048] text-white rounded-xl text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        <div className="space-y-3">
          {services.map(s => (
            <div key={s._id} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4">
              <GripVertical className="w-4 h-4 text-white/20 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{s.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.subtitle} · {s.pricing?.[0]?.price}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? "bg-green-500/15 text-green-400" : "bg-white/10 text-white/40"}`}>
                {s.active ? "Active" : "Hidden"}
              </span>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(s._id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e2a18] border border-white/10 rounded-2xl w-full max-w-2xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold">{isNew ? "Add Service" : "Edit Service"}</h2>
              <button onClick={close} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Slug ID", key: "id", placeholder: "weekly" },
                  { label: "Icon Name", key: "icon", placeholder: "Calendar" },
                  { label: "Title", key: "title", placeholder: "Service title" },
                  { label: "Subtitle", key: "subtitle", placeholder: "Short label" },
                  { label: "Image Path", key: "image", placeholder: "/image.jpeg" },
                  { label: "Service Value", key: "serviceValue", placeholder: "weekly" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-white/50 text-xs block mb-1">{f.label}</label>
                    <input value={(editItem as any)[f.key] || ""} onChange={e => setField(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1db954]" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-white/50 text-xs block mb-1">Description</label>
                <textarea value={editItem.description || ""} onChange={e => setField("description", e.target.value)} rows={3}
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
                    <span className="text-white/60 text-sm">Active / Visible</span>
                  </label>
                </div>
              </div>

              {/* Features */}
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

              {/* Pricing rows */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white/50 text-xs">Pricing Rows</label>
                  <button onClick={addPricing} className="text-[#6dd400] text-xs hover:underline">+ Add</button>
                </div>
                <div className="space-y-2">
                  {(editItem.pricing || []).map((p, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2">
                      {["plan","price","desc"].map(k => (
                        <input key={k} value={(p as any)[k]} placeholder={k} onChange={e => setPricing(i, k, e.target.value)}
                          className="bg-white/8 border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1db954]" />
                      ))}
                      <button onClick={() => removePricing(i)} className="col-span-3 text-right text-white/30 hover:text-red-400 text-xs">Remove row</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
              <button onClick={close} className="px-4 py-2 rounded-xl text-white/50 hover:text-white text-sm transition-colors">Cancel</button>
              <button onClick={save} disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-[#1db954] hover:bg-[#18a048] text-white rounded-xl text-sm font-semibold disabled:opacity-60 transition-colors">
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
