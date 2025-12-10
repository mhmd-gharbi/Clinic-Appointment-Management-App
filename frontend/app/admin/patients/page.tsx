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
import { Search, Trash2, Edit, Eye, UserPlus } from "lucide-react"

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("https://clinic-appointment-management-app.onrender.com/api/patients")
        if (response.ok) {
          const data = await response.json()
          const mappedPatients = data.map((p: any) => ({
            ...p,
            name: `${p.first_name} ${p.last_name}`,
            age: p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : "N/A",
          }))
          setPatients(mappedPatients)
        }
      } catch (error) {
        console.error("Error fetching patients:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPatients()
  }, [])

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Patients</h1>
            <p className="text-sm text-gray-500">
              Showing {patients.length} of {patients.length}
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
              <option>Gender</option>
            </select>

            <select className="border rounded-md p-2 text-sm">
              <option>Age Range</option>
            </select>

            <div className="ml-auto">
              <Button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => setAddModalOpen(true)}
              >
                + Add Patient
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="shadow-sm border-none">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Age</TableHead>
              <TableHead className="font-semibold text-gray-700">Gender</TableHead>
              <TableHead className="font-semibold text-gray-700">Phone Number</TableHead>
              <TableHead className="font-semibold text-gray-700">Email</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  Loading patients...
                </TableCell>
              </TableRow>
            ) : patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  No patients found.
                </TableCell>
              </TableRow>
            ) : (
              patients.map((p) => (
                <TableRow key={p.email} className="hover:bg-blue-50/50 transition-colors">
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${p.gender?.toLowerCase() === "male"
                        ? "bg-blue-100 text-blue-700"
                        : p.gender?.toLowerCase() === "female"
                          ? "bg-pink-100 text-pink-700"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {p.gender}
                    </span>
                  </TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell className="text-gray-500">{p.email}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100" onClick={() => {
                        setSelectedPatient(p)
                        setViewModalOpen(true)
                      }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => {
                        setSelectedPatient(p)
                        setEditModalOpen(true)
                      }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100" onClick={async () => {
                        if (confirm('Are you sure you want to delete this patient?')) {
                          try {
                            const res = await fetch(`https://clinic-appointment-management-app.onrender.com/api/patients/${p.id}`, { method: 'DELETE' });
                            if (res.ok) {
                              setPatients(patients.filter(patient => patient.id !== p.id));
                            }
                          } catch (err) {
                            console.error("Error deleting patient:", err);
                          }
                        }
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* View Patient Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>View Patient</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            <p>
              <strong>Name:</strong> {selectedPatient?.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedPatient?.age}
            </p>
            <p>
              <strong>Gender:</strong> {selectedPatient?.gender}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPatient?.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedPatient?.email}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={selectedPatient?.name} />
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input defaultValue={selectedPatient?.age} type="number" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Input defaultValue={selectedPatient?.gender} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue={selectedPatient?.phone} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={selectedPatient?.email} />
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

      {/* Add Patient Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Name" />
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input placeholder="Age" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Input placeholder="Gender" />
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
