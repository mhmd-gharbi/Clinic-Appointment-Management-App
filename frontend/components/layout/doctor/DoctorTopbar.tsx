import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronsUpDown } from "lucide-react"

export default function DoctorTopbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span>Doctor</span>
          <ChevronsUpDown className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}
