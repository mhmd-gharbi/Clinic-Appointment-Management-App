"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, FileText, Settings } from "lucide-react"

const items = [
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Documents", href: "/patient/documents", icon: FileText },
  { name: "Settings", href: "/patient/settings", icon: Settings },
]

export default function PatientSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r flex flex-col h-full shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Clinic.
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-gray-400 text-center">© 2025 Clinic App</p>
      </div>
    </aside>
  )
}
