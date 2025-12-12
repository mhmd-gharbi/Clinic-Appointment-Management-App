"use client"

import { useState, useEffect } from "react"
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

  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const [reportsRes, prescriptionsRes, referralsRes] = await Promise.all([
          fetch("https://clinic-appointment-management-app.onrender.com/api/reports/client/51").catch(() => null),
          fetch("https://clinic-appointment-management-app.onrender.com/api/prescriptions/client/51").catch(() => null),
          fetch("https://clinic-appointment-management-app.onrender.com/api/referrals/client/51").catch(() => null)
        ])

        let docs: any[] = []

        // Process Reports
        if (reportsRes && reportsRes.ok) {
          const reports = await reportsRes.json()
          docs = docs.concat(reports.map((r: any) => ({
            id: `rep-${r.id}`,
            name: `Report: ${r.type}`,
            type: "Lab Report", // or map based on r.type
            issued: new Date(r.issued_at).toLocaleDateString(),
            content: r.results,
            details: `Doctor: Dr. ${r.doctor_first_name} ${r.doctor_last_name}`
          })))
        }

        // Process Prescriptions
        if (prescriptionsRes && prescriptionsRes.ok) {
          const prescriptions = await prescriptionsRes.json()
          docs = docs.concat(prescriptions.map((p: any) => ({
            id: `pre-${p.id}`,
            name: `Prescription from Dr. ${p.doctor_last_name}`,
            type: "Prescription",
            issued: new Date(p.issued_at).toLocaleDateString(),
            content: `Medicines: ${p.medicines}\nInstructions: ${p.instructions}`,
            details: `Doctor: Dr. ${p.doctor_first_name} ${p.doctor_last_name}`
          })))
        }

        // Process Referrals
        if (referralsRes && referralsRes.ok) {
          const referrals = await referralsRes.json()
          docs = docs.concat(referrals.map((ref: any) => ({
            id: `ref-${ref.id}`,
            name: `Referral to Dr. ${ref.to_doctor_last_name}`,
            type: "Referral",
            issued: new Date(ref.created_at).toLocaleDateString(),
            content: `Reason: ${ref.reason}`,
            details: `From Dr. ${ref.from_doctor_first_name} ${ref.from_doctor_last_name} to Dr. ${ref.to_doctor_first_name} ${ref.to_doctor_last_name}`
          })))
        }

        setDocuments(docs)

      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }
    fetchDocuments()
  }, [])

  const typeColors: Record<string, string> = {
    "Lab Report": "bg-green-100 text-green-800",
    "Prescription": "bg-blue-100 text-blue-800",
    "Referral": "bg-purple-100 text-purple-800",
    "Imaging": "bg-indigo-100 text-indigo-800",
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
