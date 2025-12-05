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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import AddConsultationModal from "@/components/layout/doctor/AddConsultationModal"

export default function ConsultationsPage() {
  const [viewConsultation, setViewConsultation] = useState<any>(null)
  const [editConsultation, setEditConsultation] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)

  const consultations = [
    {
      id: 1,
      patient: "Patient One",
      date: "2025-12-30",
      time: "10:00",
      status: "upcoming",
    },
    {
      id: 2,
      patient: "Patient Two",
      date: "2025-12-31",
      time: "14:30",
      status: "upcoming",
    },
    {
      id: 3,
      patient: "Patient Three",
      date: "2026-01-01",
      time: "09:00",
      status: "completed",
    },
  ]

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-600 text-white",
    completed: "bg-green-600 text-white",
  }

  return (
    <Card className="w-full shadow-sm border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Consultations</CardTitle>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          Add Consultation
        </Button>

        <AddConsultationModal open={isOpen} onOpenChange={setIsOpen} />
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {consultations.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.patient}</TableCell>
                <TableCell>{c.date}</TableCell>
                <TableCell>{c.time}</TableCell>
                <TableCell>
                  <Badge className={statusColors[c.status]}>{c.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {/* VIEW */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setViewConsultation(c)}
                  >
                    View
                  </Button>

                  {/* EDIT */}
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setEditConsultation(c)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* View Consultation Modal */}
      <Dialog
        open={!!viewConsultation}
        onOpenChange={() => setViewConsultation(null)}
      >
        <DialogContent className="sm:max-w-md sm:w-full">
          <DialogHeader>
            <DialogTitle>View Consultation</DialogTitle>
          </DialogHeader>
          {viewConsultation && (
            <div className="mt-2 space-y-2">
              <p>
                <strong>Patient:</strong> {viewConsultation.patient}
              </p>
              <p>
                <strong>Date:</strong> {viewConsultation.date}
              </p>
              <p>
                <strong>Time:</strong> {viewConsultation.time}
              </p>
              <p>
                <strong>Status:</strong> {viewConsultation.status}
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={() => setViewConsultation(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Consultation Modal */}
      <Dialog
        open={!!editConsultation}
        onOpenChange={() => setEditConsultation(null)}
      >
        <DialogContent className="sm:max-w-lg sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit Consultation</DialogTitle>
          </DialogHeader>
          {editConsultation && (
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Patient</Label>
                <Input defaultValue={editConsultation.patient} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" defaultValue={editConsultation.date} />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" defaultValue={editConsultation.time} />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  onClick={() => setEditConsultation(null)}
                >
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
