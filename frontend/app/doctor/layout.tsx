import { ReactNode } from "react"
import DoctorSidebar from "@/components/layout/doctor/DoctorSidebar"
import DoctorTopbar from "@/components/layout/doctor/DoctorTopbar"

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DoctorTopbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
