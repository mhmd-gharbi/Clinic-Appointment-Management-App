"use client"

import { useState, useEffect } from "react"
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
import { Eye, Edit, Trash2 } from "lucide-react"
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
  const [doctorsList, setDoctorsList] = useState([])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://clinic-appointment-management-app.onrender.com/api/doctors")
        if (response.ok) {
          const data = await response.json()
          setDoctorsList(data)
        }
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    if (addModalOpen) {
      fetchDoctors()
    }
  }, [addModalOpen])

  return (
    <div>
      <Card className="shadow-sm border-none">
        <CardHeader className="flex flex-row items-center justify-between">


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
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Patient</TableHead>
                <TableHead className="font-semibold text-gray-700">Doctor</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Time</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id} className="hover:bg-blue-50/50 transition-colors">
                  <TableCell className="font-medium">#{appt.id}</TableCell>
                  <TableCell>{appt.patient}</TableCell>
                  <TableCell>{appt.doctor}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${statusColors[appt.status]} hover:${statusColors[appt.status]} px-3 py-1 font-normal`}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100" onClick={() => {
                        setSelectedAppt(appt)
                        setViewModalOpen(true)
                      }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => {
                        setSelectedAppt(appt)
                        setEditModalOpen(true)
                      }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
                  {doctorsList.map((doctor: any) => (
                    <SelectItem key={doctor._id || doctor.id || doctor.email} value={doctor.name}>
                      {doctor.name}
                    </SelectItem>
                  ))}
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
