"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PatientDocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<any>(null)

  const documents = [
    {
      id: 1,
      name: "Blood Test Report",
      type: "Lab Report",
      issued: "2025-12-22",
      content: "This is a sample blood test report content...",
    },
    {
      id: 2,
      name: "Prescription — Dr. Sarah",
      type: "Prescription",
      issued: "2025-12-18",
      content: "Prescription details go here...",
    },
    {
      id: 3,
      name: "X-Ray Report",
      type: "Imaging",
      issued: "2025-12-10",
      content: "X-ray report content placeholder...",
    },
  ]

  const typeColors: Record<string, string> = {
    "Lab Report": "bg-green-100 text-green-800",
    Prescription: "bg-blue-100 text-blue-800",
    Imaging: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Documents</h2>

      <Card className="w-full shadow-sm border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Your Medical Documents
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>
                    <Badge className={typeColors[doc.type]}>{doc.type}</Badge>
                  </TableCell>
                  <TableCell>{doc.issued}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDoc(doc)}
                        >
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-lg sm:w-full">
                        <DialogHeader>
                          <DialogTitle>{selectedDoc?.name}</DialogTitle>
                        </DialogHeader>
                        <p className="mt-2 text-sm text-gray-700">
                          {selectedDoc?.content}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <Button onClick={() => setSelectedDoc(null)}>
                            Close
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
