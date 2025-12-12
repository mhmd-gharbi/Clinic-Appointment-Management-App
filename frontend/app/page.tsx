"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Stethoscope, User } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  const handleLogin = (role: string) => {
    // Clear previous session
    localStorage.clear()

    // Set new session (mock)
    if (role === "admin") {
      localStorage.setItem("userRole", "admin")
      localStorage.setItem("userId", "1") // Admin ID
      router.push("/admin/dashboard")
    } else if (role === "doctor") {
      localStorage.setItem("userRole", "doctor")
      localStorage.setItem("userId", "1") // Doctor ID
      router.push("/doctor/dashboard")
    } else if (role === "patient") {
      localStorage.setItem("userRole", "client") // "client" is the role in DB
      localStorage.setItem("userId", "51") // Patient/Client ID
      router.push("/patient/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to <span className="text-blue-600">Clinic.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive appointment management system. Please select your role to proceed with the demo login.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Admin Card */}
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-gray-800 cursor-pointer" onClick={() => handleLogin('admin')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-gray-800" />
              </div>
              <CardTitle>Administrator</CardTitle>
              <CardDescription>Manage users, doctors, and system settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gray-800 hover:bg-gray-900" onClick={(e) => { e.stopPropagation(); handleLogin('admin'); }}>
                Login as Admin
              </Button>
            </CardContent>
          </Card>

          {/* Doctor Card */}
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-600 cursor-pointer" onClick={() => handleLogin('doctor')}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Doctor</CardTitle>
              <CardDescription>View schedule, manage appointments and patients.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={(e) => { e.stopPropagation(); handleLogin('doctor'); }}>
                Login as Doctor
              </Button>
            </CardContent>
          </Card>

          {/* Patient Card */}
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-green-600 cursor-pointer" onClick={() => handleLogin('patient')}>
            <CardHeader>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Patient</CardTitle>
              <CardDescription>Book appointments, view history and documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={(e) => { e.stopPropagation(); handleLogin('patient'); }}>
                Login as Patient
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
