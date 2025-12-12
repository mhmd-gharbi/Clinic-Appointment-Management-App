"use client"

import { usePathname } from "next/navigation"
import UserProfileDropdown from "@/components/layout/UserProfileDropdown"

export default function AdminTopbar() {
  const pathname = usePathname()
  const segment = pathname.split('/').pop()
  const title = segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Dashboard'

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold capitalize text-gray-700">{title}</h2>

      <div className="flex items-center space-x-2">
        <UserProfileDropdown name="Admin" initial="A" roleLabel="Administrator" />
      </div>
    </header>
  )
}
