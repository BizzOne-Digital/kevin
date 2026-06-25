import type { ReactNode } from "react"
import AdminSessionProvider from "@/components/admin/AdminSessionProvider"

export const metadata = {
  title: "Admin Portal — Niagara Pet Waste Removal",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminSessionProvider>
      {children}
    </AdminSessionProvider>
  )
}
