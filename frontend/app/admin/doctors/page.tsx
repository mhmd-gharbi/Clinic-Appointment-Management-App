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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("all")
  const [specialty, setSpecialty] = useState("all")

  // distinct roles and specialties for dropdowns
  const roles = Array.from(new Set(doctors.map(d => d.role).filter(Boolean)))
  const specialties = Array.from(new Set(doctors.map(d => d.specialty).filter(Boolean)))

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name?.toLowerCase().includes(search.toLowerCase()) ||
      doc.email?.toLowerCase().includes(search.toLowerCase())
    const matchesRole = role === "all" || doc.role === role
    const matchesSpecialty = specialty === "all" || doc.specialty === specialty
    return matchesSearch && matchesRole && matchesSpecialty
  })

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const [doctorsRes, usersRes] = await Promise.all([
          fetch("https://clinic-appointment-management-app.onrender.com/api/doctors"),
          fetch("https://clinic-appointment-management-app.onrender.com/api/users")
        ])

        if (doctorsRes.ok && usersRes.ok) {
          const doctorsData = await doctorsRes.json()
          const usersData = await usersRes.json()

          const mappedDoctors = doctorsData.map((d: any) => {
            const user = usersData.find((u: any) => u.id === d.user_id)
            if (user) {
              return {
                ...d,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                name: `${user.first_name} ${user.last_name}`
              }
            }
            return {
              ...d,
              name: d.name || `${d.first_name || ''} ${d.last_name || ''}`.trim() || "Unknown"
            }
          })
          setDoctors(mappedDoctors)
        } else {
          console.error("Failed to fetch doctors or users")
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
        <CardContent className=" space-y-4">


          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-60">
              <Input
                placeholder="Search name or email..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((r: any) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((s: any) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

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
      <Card className="shadow-sm border-none">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Role</TableHead>
              <TableHead className="font-semibold text-gray-700">Specialty</TableHead>
              <TableHead className="font-semibold text-gray-700">Phone Number</TableHead>
              <TableHead className="font-semibold text-gray-700">Email</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  Loading doctors...
                </TableCell>
              </TableRow>
            ) : filteredDoctors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  No doctors found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDoctors.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-blue-50/50 transition-colors">
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {doc.role}
                    </span>
                  </TableCell>
                  <TableCell>{doc.specialty}</TableCell>
                  <TableCell>{doc.phone}</TableCell>
                  <TableCell className="text-gray-500">{doc.email}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100" onClick={() => {
                        setSelectedDoctor(doc)
                        setViewModalOpen(true)
                      }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => {
                        setSelectedDoctor(doc)
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
              ))
            )}
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
