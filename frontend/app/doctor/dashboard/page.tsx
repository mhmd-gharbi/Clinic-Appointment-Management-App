"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">6</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border p-3 rounded-lg">
              <span>John Smith — 10:00 AM</span>
              <span className="text-sm text-gray-500">Normal</span>
            </div>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <span>Sarah Lee — 11:30 AM</span>
              <span className="text-sm text-gray-500">Urgent</span>
            </div>

            <div className="flex items-center justify-between border p-3 rounded-lg">
              <span>Adam Johnson — 2:00 PM</span>
              <span className="text-sm text-gray-500">Normal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
