"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([
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
  ])

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-500",
    pending: "bg-yellow-500",
    cancelled: "bg-red-500",
  }

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<any>(null)

  return (
    <div>
      <Card className="w-full shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Appointments</CardTitle>

          <div className="flex items-center gap-2">
            <Input placeholder="Search patient or doctor..." className="w-64" />
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setAddModalOpen(true)}
            >
              Add Appointment
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedAppt(appt)
                        setViewModalOpen(true)
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setSelectedAppt(appt)
                        setEditModalOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>View Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            <p>
              <strong>Patient:</strong> {selectedAppt?.patient}
            </p>
            <p>
              <strong>Doctor:</strong> {selectedAppt?.doctor}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppt?.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedAppt?.time}
            </p>
            <p>
              <strong>Status:</strong> {selectedAppt?.status}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Patient</Label>
              <Input value={selectedAppt?.patient} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Doctor</Label>
              <Input value={selectedAppt?.doctor} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" defaultValue={selectedAppt?.date} />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" defaultValue={selectedAppt?.time} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={selectedAppt?.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Appointment Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Add Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Patient</Label>
              <Input placeholder="Patient Name" />
            </div>
            <div className="space-y-2">
              <Label>Doctor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Ahmed">Dr. Ahmed</SelectItem>
                  <SelectItem value="Dr. Karim">Dr. Karim</SelectItem>
                  <SelectItem value="Dr. Sara">Dr. Sara</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
