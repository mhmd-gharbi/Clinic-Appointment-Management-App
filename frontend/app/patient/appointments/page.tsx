"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PatientAppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [bookModalOpen, setBookModalOpen] = useState(false)

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "2025-12-30",
      time: "10:00 AM",
      status: "upcoming",
      notes: "Regular checkup. Bring previous blood test results.",
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Karim",
      date: "2025-12-22",
      time: "02:00 PM",
      status: "completed",
      notes: "Follow-up after prescription. All vitals normal.",
    },
    {
      id: 3,
      doctor: "Dr. Lina Mohamed",
      date: "2025-12-10",
      time: "09:30 AM",
      status: "cancelled",
      notes: "Appointment cancelled by patient due to travel.",
    },
  ]

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-600",
    completed: "bg-green-600",
    cancelled: "bg-red-600",
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Appointments</h2>

      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Your Appointments
          </CardTitle>

          {/* Book New Modal */}
          <Dialog open={bookModalOpen} onOpenChange={setBookModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Book New
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg sm:w-full">
              <DialogHeader>
                <DialogTitle>Book a New Appointment</DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {/* Doctor selection */}
                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="2">Dr. Ahmed Karim</SelectItem>
                      <SelectItem value="3">Dr. Lina Mohamed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Appointment date */}
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>

                {/* Appointment time */}
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" />
                </div>

                {/* Appointment type */}
                <div className="space-y-2">
                  <Label>Type</Label>
                  <RadioGroup className="flex flex-row gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent">Urgent</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    variant="outline"
                    onClick={() => setBookModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Book
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        {/* Appointments Table */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.doctor}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.time}</TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[a.status]} text-white`}>
                      {a.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAppointment(a)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
