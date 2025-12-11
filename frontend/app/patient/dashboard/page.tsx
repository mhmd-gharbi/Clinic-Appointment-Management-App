"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarClock, FileText, Pill, Activity } from "lucide-react"

export default function PatientDashboardPage() {
  const stats = [
    {
      title: "Upcoming Appointment",
      value: "Dec 30",
      sub: "10:00 AM",
      icon: CalendarClock,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Reports Available",
      value: "3",
      sub: "New Results",
      icon: FileText,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Prescriptions",
      value: "1",
      sub: "Active",
      icon: Pill,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6">


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
              <p className="text-xs text-gray-500">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="p-2 bg-white rounded-full border mt-1">
                <Activity className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-900">Blood Test Report Ready</p>
                  <span className="text-xs text-gray-400">Yesterday</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Your blood test results from Dec 28 are now available for viewing.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="p-2 bg-white rounded-full border mt-1">
                <Pill className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-900">Prescription Added</p>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Dr. Sarah Johnson added a new prescription for Amoxicillin.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
