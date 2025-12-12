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
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  // Search term for filtering appointments
  const [search, setSearch] = useState('')
  // New appointment fields

  const [newPatientId, setNewPatientId] = useState('')
  const [newDoctorId, setNewDoctorId] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newStatus, setNewStatus] = useState('scheduled')


  const statusColors: Record<string, string> = {
    scheduled: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    normal: "bg-gray-500",
    urgent: "bg-orange-500"
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("https://clinic-appointment-management-app.onrender.com/api/appointments")
        if (res.ok) {
          const data = await res.json()
          const mapped = data.map((appt: any) => ({
            id: appt.id,
            patient: `${appt.client_first_name} ${appt.client_last_name}`,
            doctor: `Dr. ${appt.doctor_first_name} ${appt.doctor_last_name}`,
            date: new Date(appt.date).toLocaleDateString(),
            time: appt.time,
            status: appt.status || 'scheduled',
            type: appt.type
          }))
          setAppointments(mapped)
        }
      } catch (error) {
        console.error("Error fetching appointments:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  // Filtered appointments based on search term
  const filteredAppointments = appointments.filter(appt =>
    appt.patient.toLowerCase().includes(search.toLowerCase()) ||
    appt.doctor.toLowerCase().includes(search.toLowerCase())
  )

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<any>(null)
  const [doctorsList, setDoctorsList] = useState([])
  const [patientsList, setPatientsList] = useState<any[]>([])

  useEffect(() => {
    // Fetch patients regardless of modal state
    const fetchPatients = async () => {
      try {
        const [patientsRes, usersRes] = await Promise.all([
          fetch("https://clinic-appointment-management-app.onrender.com/api/patients").catch(() => null),
          fetch("https://clinic-appointment-management-app.onrender.com/api/users").catch(() => null)
        ])

        if (usersRes && usersRes.ok) {
          const usersData = await usersRes.json()
          let patientsData: any[] = []

          // Try to get patients data if available
          if (patientsRes && patientsRes.ok) {
            try {
              patientsData = await patientsRes.json()
            } catch (e) {
              console.warn("Failed to parse patients JSON", e)
            }
          }

          let mappedPatients: any[] = []

          if (patientsData.length > 0) {
            // Normal flow: Merge patient data with user data
            mappedPatients = patientsData.map((p: any) => {
              const user = usersData.find((u: any) => u.id === p.user_id)
              const age = p.date_of_birth
                ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear()
                : "N/A"

              if (user) {
                return {
                  ...p,
                  ...user,
                  name: `${user.first_name} ${user.last_name}`,
                  age,
                  id: p.id,
                  user_id: p.user_id
                }
              }
              return {
                ...p,
                name: p.name || `${p.first_name || ''} ${p.last_name || ''}`.trim() || "Unknown",
                age
              }
            })
          } else {
            // Fallback flow: Use users with role 'client'
            console.warn("Using fallback: Fetching clients from users table")
            mappedPatients = usersData
              .filter((u: any) => u.role === 'client')
              .map((u: any) => ({
                ...u,
                id: u.id, // Use user ID as patient ID in fallback
                user_id: u.id,
                name: `${u.first_name} ${u.last_name}`,
                age: "N/A",
                gender: "N/A",
                medical_history: "N/A"
              }))
          }
          setPatientsList(mappedPatients)
        } else {
          console.error("Failed to fetch users (critical)")
        }
      } catch (error) {
        console.error("Error fetching patients:", error)
      } finally {
        setLoading(false)
      }
    }

    // Fetch doctors only when the Add Appointment modal is open
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://clinic-appointment-management-app.onrender.com/api/doctors");
        if (response.ok) {
          const data = await response.json();
          const formatted = data.map((doc: any) => ({
            id: doc.id || doc._id,
            name: `${doc.first_name || ''} ${doc.last_name || ''}`.trim()
          }));
          setDoctorsList(formatted);
          console.log("Fetched doctors:", formatted);
        } else {
          console.error("Failed to fetch doctors, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    // Always fetch patients on component mount / when modal state changes
    fetchPatients();

    if (addModalOpen) {
      fetchDoctors();
    }
  }, [addModalOpen]);

  // Add appointment handler
  const handleAddAppointment = async () => {
    try {
      const payload = {
        clientId: newPatientId,
        doctorId: newDoctorId,
        date: newDate,
        time: newTime,
        type: "normal",
        status: newStatus,
      };
      const res = await fetch("https://clinic-appointment-management-app.onrender.com/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // Refresh appointments list
        const refreshed = await fetch("https://clinic-appointment-management-app.onrender.com/api/appointments");
        const data = await refreshed.json();
        const mapped = data.map((appt: any) => ({
          id: appt.id,
          patient: `${appt.client_first_name} ${appt.client_last_name}`,
          doctor: `Dr. ${appt.doctor_first_name} ${appt.doctor_last_name}`,
          date: new Date(appt.date).toLocaleDateString(),
          time: appt.time,
          status: appt.status || "scheduled",
          type: appt.type,
        }));
        setAppointments(mapped);
        setAddModalOpen(false);
        // reset fields
        setNewPatientId("");
        setNewDoctorId("");
        setNewDate("");
        setNewTime("");
        setNewStatus("scheduled");
      } else {
        console.error("Failed to add appointment");
      }
    } catch (err) {
      console.error("Error adding appointment:", err);
    }
  };

  return (
    <div>
      <Card className="shadow-sm border-none">
        <CardHeader className="flex flex-row items-center justify-between">


          <div className="flex items-center gap-2">
            <Input placeholder="Search patient or doctor..." className="w-64" value={search} onChange={e => setSearch(e.target.value)} />
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
              {filteredAppointments.map((appt) => (
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
              <Select value={newPatientId} onValueChange={setNewPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Patient" />
                </SelectTrigger>
                <SelectContent>
                  {patientsList.map((pat: any) => (
                    <SelectItem key={pat.id} value={pat.id}>{pat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Doctor</Label>
              <Select value={newDoctorId} onValueChange={setNewDoctorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctorsList.map((doctor: any) => (
                    <SelectItem key={doctor._id || doctor.id || doctor.email} value={doctor.id || doctor._id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddAppointment}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
