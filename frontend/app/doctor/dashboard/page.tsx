"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, MessageSquare, Clock } from "lucide-react"

export default function DoctorDashboardPage() {
  const stats = [
    {
      title: "Today's Appointments",
      value: "6",
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Pending Reports",
      value: "2",
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Messages",
      value: "4",
      icon: MessageSquare,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Doctor. Here is your daily summary.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent appointments */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "John Smith", time: "10:00 AM", status: "Normal", bg: "bg-green-100 text-green-700" },
              { name: "Sarah Lee", time: "11:30 AM", status: "Urgent", bg: "bg-red-100 text-red-700" },
              { name: "Adam Johnson", time: "2:00 PM", status: "Normal", bg: "bg-gray-100 text-gray-700" }
            ].map((appt, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full border">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appt.name}</p>
                    <p className="text-sm text-gray-500">{appt.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${appt.bg}`}>
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
