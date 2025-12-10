"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import { Search, Trash2, Edit, Eye } from "lucide-react"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://clinic-appointment-management-app.onrender.com/api/doctors")
        if (response.ok) {
          const data = await response.json()
          setDoctors(data)
        } else {
          console.error("Failed to fetch doctors")
        }
      } catch (error) {
        console.error("Error fetching doctors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Doctors</h1>
            <p className="text-sm text-gray-500">
              Showing {doctors.length} of {doctors.length}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-60">
              <Input placeholder="Searching..." className="pl-9" />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            <Button variant="outline">Filter</Button>

            <select className="border rounded-md p-2 text-sm">
              <option>Role</option>
            </select>

            <select className="border rounded-md p-2 text-sm">
              <option>Specialty</option>
            </select>

            <div className="ml-auto">
              <Button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => setAddModalOpen(true)}
              >
                + Add Doctor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {doctors.map((doc) => (
              <TableRow key={doc.email}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.role}</TableCell>
                <TableCell>{doc.specialty}</TableCell>
                <TableCell>{doc.phone}</TableCell>
                <TableCell>{doc.email}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
                    <Edit
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={() => {
                        setSelectedDoctor(doc)
                        setEditModalOpen(true)
                      }}
                    />
                    <Eye
                      className="w-5 h-5 text-blue-600 cursor-pointer"
                      onClick={() => {
                        setSelectedDoctor(doc)
                        setViewModalOpen(true)
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* View Doctor Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>View Doctor</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            <p>
              <strong>Name:</strong> {selectedDoctor?.name}
            </p>
            <p>
              <strong>Role:</strong> {selectedDoctor?.role}
            </p>
            <p>
              <strong>Specialty:</strong> {selectedDoctor?.specialty}
            </p>
            <p>
              <strong>Phone:</strong> {selectedDoctor?.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedDoctor?.email}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Doctor Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={selectedDoctor?.name} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue={selectedDoctor?.role} />
            </div>
            <div className="space-y-2">
              <Label>Specialty</Label>
              <Input defaultValue={selectedDoctor?.specialty} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue={selectedDoctor?.phone} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={selectedDoctor?.email} />
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

      {/* Add Doctor Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Add Doctor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Name" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input placeholder="Role" />
            </div>
            <div className="space-y-2">
              <Label>Specialty</Label>
              <Input placeholder="Specialty" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="Phone" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="Email" />
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
