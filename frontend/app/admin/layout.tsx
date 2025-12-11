import React from "react"
import "@/app/globals.css"

import AdminSidebar from "@/components/layout/admin/AdminSidebar"
import AdminTopbar from "@/components/layout/admin/AdminTopbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
