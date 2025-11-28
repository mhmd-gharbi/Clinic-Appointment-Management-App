import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

import AdminSidebar from "@/components/layout/admin/AdminSidebar"
import AdminTopbar from "@/components/layout/admin/AdminTopbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen bg-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex w-full h-full">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
              <AdminTopbar />
              <main className="p-6 overflow-y-auto">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
