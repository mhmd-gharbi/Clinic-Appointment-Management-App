import { ReactNode } from "react"
import PatientSidebar from "@/components/layout/patient/PatientSidebar"
import PatientTopbar from "@/components/layout/patient/PatientTopbar"

export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen bg-gray-100">
        <div className="flex w-full h-full">
          <PatientSidebar />
          <div className="flex-1 flex flex-col">
            <PatientTopbar />
            <main className="p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
