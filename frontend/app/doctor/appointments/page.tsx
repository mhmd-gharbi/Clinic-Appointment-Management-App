"use client"

import { useState, useEffect } from "react"
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
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye } from "lucide-react"

export default function DoctorAppointmentsPage() {
    const [appointments, setAppointments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [selectedAppt, setSelectedAppt] = useState<any>(null)

    const statusColors: Record<string, string> = {
        scheduled: "bg-blue-600",
        completed: "bg-green-600",
        cancelled: "bg-red-600",
        normal: "bg-gray-500",
        urgent: "bg-orange-500"
    }

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Hardcoded Doctor ID 1 for demo purposes
                const res = await fetch("https://clinic-appointment-management-app.onrender.com/api/appointments/doctor/1")
                if (res.ok) {
                    const data = await res.json()
                    const mapped = data.map((appt: any) => ({
                        id: appt.id,
                        patient: `${appt.client_first_name} ${appt.client_last_name}`,
                        phone: appt.client_phone,
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

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold">My Appointments</h2>

            <Card className="shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Upcoming Schedule
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                                        Loading appointments...
                                    </TableCell>
                                </TableRow>
                            ) : appointments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                                        No appointments found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments.map((appt) => (
                                    <TableRow key={appt.id}>
                                        <TableCell className="font-medium">
                                            <div>
                                                <p>{appt.patient}</p>
                                                <p className="text-xs text-gray-500">{appt.phone}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{appt.date}</TableCell>
                                        <TableCell>{appt.time}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={statusColors[appt.type] || "bg-gray-100"}>
                                                {appt.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={statusColors[appt.status] || "bg-gray-500"}>
                                                {appt.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                                                onClick={() => {
                                                    setSelectedAppt(appt)
                                                    setViewModalOpen(true)
                                                }}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* View Appointment Modal */}
            <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
                <DialogContent className="max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle>View Appointment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 mt-2">
                        <p><strong>Patient:</strong> {selectedAppt?.patient}</p>
                        <p><strong>Phone:</strong> {selectedAppt?.phone}</p>
                        <p><strong>Date:</strong> {selectedAppt?.date}</p>
                        <p><strong>Time:</strong> {selectedAppt?.time}</p>
                        <p><strong>Type:</strong> {selectedAppt?.type}</p>
                        <p><strong>Status:</strong> {selectedAppt?.status}</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
