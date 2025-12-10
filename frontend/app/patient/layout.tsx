import { ReactNode } from "react"
import PatientSidebar from "@/components/layout/patient/PatientSidebar"
import PatientTopbar from "@/components/layout/patient/PatientTopbar"

export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <PatientSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <PatientTopbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
