"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

import { Calendar, CheckCircle, Clock, Users, UserPlus } from "lucide-react"

export default function DashboardLayout() {
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  // Fetch appointments count
  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://clinic-appointment-management-app.onrender.com/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointmentsCount(data.length);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://clinic-appointment-management-app.onrender.com/api/doctors")
        if (response.ok) {
          const data = await response.json()
          setDoctorsCount(data.length)
        }
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    const fetchPatients = async () => {
      try {
        // Primary: fetch patients directly
        const patientsRes = await fetch("https://clinic-appointment-management-app.onrender.com/api/patients");
        if (patientsRes.ok) {
          const patientsData = await patientsRes.json();
          const count = Array.isArray(patientsData) ? patientsData.length : (Array.isArray(patientsData.patients) ? patientsData.patients.length : 0);
          setPatientsCount(count);
          return;
        }
        // Fallback: fetch users and count those with role 'client'
        const usersRes = await fetch("https://clinic-appointment-management-app.onrender.com/api/users");
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          const clientCount = usersData.filter((u: any) => u.role === "client").length;
          setPatientsCount(clientCount);
        } else {
          console.error("Failed to fetch patients and fallback users");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, [])

  const stats = [
    { label: "Total Appointments", value: appointmentsCount, icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
    { label: "Scheduled", value: 32, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed", value: 99, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Doctors", value: doctorsCount, icon: UserPlus, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Patients", value: patientsCount, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  ]

  return (
    <main className="p-6 space-y-6">


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
