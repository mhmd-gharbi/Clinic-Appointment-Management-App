"use client"

import { useState } from "react"
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

export default function PatientsPage() {
  const [patients, setPatients] = useState([
    {
      name: "Amina Benali",
      age: 28,
      gender: "Female",
      phone: "+0123456789",
      email: "amina@gmail.com",
    },
    {
      name: "Karim Douiri",
      age: 40,
      gender: "Male",
      phone: "+0123456789",
      email: "karim@gmail.com",
    },
    {
      name: "Sara Messaoud",
      age: 32,
      gender: "Female",
      phone: "+0123456789",
      email: "sara@gmail.com",
    },
    {
      name: "Omar Bezza",
      age: 51,
      gender: "Male",
      phone: "+0123456789",
      email: "omar@gmail.com",
    },
  ])

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
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.email}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.gender}</TableCell>
                <TableCell>{p.phone}</TableCell>
                <TableCell>{p.email}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
                    <Edit
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={() => {
                        setSelectedPatient(p)
                        setEditModalOpen(true)
                      }}
                    />
                    <Eye
                      className="w-5 h-5 text-blue-600 cursor-pointer"
                      onClick={() => {
                        setSelectedPatient(p)
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
