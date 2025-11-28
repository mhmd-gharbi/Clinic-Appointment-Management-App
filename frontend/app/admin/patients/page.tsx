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

export default function PatientsPage() {
  const patients = [
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
  ]

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
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
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
