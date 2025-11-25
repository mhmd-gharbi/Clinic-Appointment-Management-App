import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronsUpDown } from "lucide-react"

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <select className="border rounded-md p-2 text-sm">
          <option>Select Department</option>
        </select>

        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span>Admin</span>
          <ChevronsUpDown className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}
