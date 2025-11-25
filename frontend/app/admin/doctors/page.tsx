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

import { Search, Trash2, Edit, Eye } from "lucide-react"

export default function DoctorsPage() {
  const doctors = [
    {
      name: "Dr. Ammar",
      role: "Professors",
      specialty: "Dermatology",
      phone: "+0123456789",
      email: "ammar@gmail.com",
    },
    {
      name: "Dr. Khan",
      role: "Medical expert",
      specialty: "Dermatology",
      phone: "+0123456789",
      email: "khan@gmail.com",
    },
    {
      name: "Dr. Abdullah",
      role: "Communicator",
      specialty: "Neurology",
      phone: "+0123456789",
      email: "abdullah@gmail.com",
    },
    {
      name: "Dr. Alia",
      role: "Collaborator",
      specialty: "Family medicine",
      phone: "+0123456789",
      email: "ali@gmail.com",
    },
  ]

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
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
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
                    <Edit className="w-5 h-5 text-green-600 cursor-pointer" />
                    <Eye className="w-5 h-5 text-blue-600 cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
