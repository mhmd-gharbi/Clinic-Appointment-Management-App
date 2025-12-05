"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PatientDashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-medium">Dec 30 — 10:00 AM</p>
            <p className="text-gray-500 text-sm">Dr. Sarah Johnson</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="border p-3 rounded-lg flex justify-between">
              <div>
                <p className="font-medium">Blood Test Report Ready</p>
                <p className="text-sm text-gray-500">Issued yesterday</p>
              </div>
            </div>

            <div className="border p-3 rounded-lg flex justify-between">
              <div>
                <p className="font-medium">Prescription Added</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
