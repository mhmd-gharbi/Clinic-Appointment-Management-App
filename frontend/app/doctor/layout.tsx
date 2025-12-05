import { ReactNode } from "react"
import DoctorSidebar from "@/components/layout/doctor/DoctorSidebar"
import DoctorTopbar from "@/components/layout/doctor/DoctorTopbar"

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <body className="flex h-screen bg-gray-100">
        <div className="flex w-full h-full">
          <DoctorSidebar />
          <div className="flex-1 flex flex-col">
            <DoctorTopbar />
            <main className="p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </div>
  )
}
