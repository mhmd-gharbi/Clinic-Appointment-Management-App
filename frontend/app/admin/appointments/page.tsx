import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Ahmed",
      date: "2025-01-12",
      time: "10:30",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Sarah Smith",
      doctor: "Dr. Karim",
      date: "2025-01-13",
      time: "09:00",
      status: "pending",
    },
    {
      id: 3,
      patient: "Michael Brown",
      doctor: "Dr. Sara",
      date: "2025-01-13",
      time: "14:00",
      status: "cancelled",
    },
  ]

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
  }

  return (
    <Card className="w-full shadow-sm border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Appointments</CardTitle>

        <div className="flex items-center gap-2">
          <Input placeholder="Search patient or doctor..." className="w-64" />
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add Appointment
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption>All scheduled appointments</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.id}</TableCell>
                <TableCell>{appt.patient}</TableCell>
                <TableCell>{appt.doctor}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>

                <TableCell>
                  <Badge className={statusColors[appt.status]}>
                    {appt.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
