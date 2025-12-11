"use client"

import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronsUpDown } from "lucide-react"

export default function PatientTopbar() {
  const pathname = usePathname()
  const segment = pathname.split('/').pop()
  const title = segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Dashboard'

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold capitalize text-gray-700">{title}</h2>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">P</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">Patient Doe</span>
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  )
}
