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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState("all")
  const [ageRange, setAgeRange] = useState("all")

  // distinct genders
  const genders = Array.from(new Set(patients.map(p => p.gender).filter(g => g && g !== "N/A")))

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.includes(search)

    const matchesGender = gender === "all" || p.gender === gender

    let matchesAge = true
    if (ageRange !== "all") {
      if (p.age === "N/A") {
        matchesAge = false
      } else {
        const ageNum = parseInt(p.age)
        if (ageRange === "0-17") matchesAge = ageNum <= 17
        else if (ageRange === "18-64") matchesAge = ageNum >= 18 && ageNum <= 64
        else if (ageRange === "65+") matchesAge = ageNum >= 65
      }
    }
    return matchesSearch && matchesGender && matchesAge
  })

  useEffect(() => {
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
          setPatients(mappedPatients)
        } else {
          console.error("Failed to fetch users (critical)")
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
        <CardContent className="space-y-4">


          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-60">
              <Input
                placeholder="Search name, email..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                {genders.map((g: any) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ageRange} onValueChange={setAgeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Age Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="0-17">Child (0-17)</SelectItem>
                <SelectItem value="18-64">Adult (18-64)</SelectItem>
                <SelectItem value="65+">Senior (65+)</SelectItem>
              </SelectContent>
            </Select>

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
            ) : filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  No patients found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((p) => (
                <TableRow key={p.id} className="hover:bg-blue-50/50 transition-colors">
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
