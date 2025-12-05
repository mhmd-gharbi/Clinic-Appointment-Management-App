"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AddConsultationModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [patient, setPatient] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [type, setType] = useState("normal")
  const [prescription, setPrescription] = useState({
    medicines: "",
    instructions: "",
  })
  const [report, setReport] = useState({ type: "", results: "" })
  const [referral, setReferral] = useState({ toDoctorId: "", reason: "" })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl sm:w-full h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Consultation</DialogTitle>
        </DialogHeader>

        <CardContent className="space-y-4 mt-2">
          {/* Patient */}
          <div className="space-y-2">
            <Label>Patient</Label>
            <Select onValueChange={setPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">John Doe</SelectItem>
                <SelectItem value="2">Sarah Smith</SelectItem>
                <SelectItem value="3">Michael Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label>Time</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Type</Label>
            <RadioGroup
              className="flex flex-row gap-4"
              value={type}
              onValueChange={setType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent">Urgent</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Prescription */}
          <div className="space-y-2">
            <Label>Prescription (optional)</Label>
            <Input
              placeholder="Medicines"
              value={prescription.medicines}
              onChange={(e) =>
                setPrescription({ ...prescription, medicines: e.target.value })
              }
            />
            <Textarea
              placeholder="Instructions"
              value={prescription.instructions}
              onChange={(e) =>
                setPrescription({
                  ...prescription,
                  instructions: e.target.value,
                })
              }
            />
          </div>

          {/* Report */}
          <div className="space-y-2">
            <Label>Report (optional)</Label>
            <Input
              placeholder="Report Type"
              value={report.type}
              onChange={(e) => setReport({ ...report, type: e.target.value })}
            />
            <Textarea
              placeholder="Results"
              value={report.results}
              onChange={(e) =>
                setReport({ ...report, results: e.target.value })
              }
            />
          </div>

          {/* Referral */}
          <div className="space-y-2">
            <Label>Referral (optional)</Label>
            <Select
              onValueChange={(val) =>
                setReferral({ ...referral, toDoctorId: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Refer to doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. Sarah Johnson</SelectItem>
                <SelectItem value="2">Dr. Ahmed Karim</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Reason for referral"
              value={referral.reason}
              onChange={(e) =>
                setReferral({ ...referral, reason: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Consultation
            </Button>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}
