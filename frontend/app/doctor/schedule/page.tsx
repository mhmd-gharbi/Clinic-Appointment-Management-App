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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([
    { day: "Monday", hours: "09:00 AM — 04:00 PM" },
    { day: "Tuesday", hours: "09:00 AM — 04:00 PM" },
    { day: "Wednesday", hours: "09:00 AM — 04:00 PM" },
    { day: "Thursday", hours: "09:00 AM — 04:00 PM" },
    { day: "Friday", hours: "09:00 AM — 04:00 PM" },
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [customSlot, setCustomSlot] = useState({ day: "", start: "", end: "" })

  const addCustomSlot = () => {
    if (customSlot.day && customSlot.start && customSlot.end) {
      setSchedule([
        ...schedule,
        {
          day: customSlot.day,
          hours: `${customSlot.start} — ${customSlot.end}`,
        },
      ])
      setCustomSlot({ day: "", start: "", end: "" })
      setModalOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Schedule</h2>

      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Weekly Schedule
          </CardTitle>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setModalOpen(true)}
          >
            Add Custom Slot
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Working Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.day}>
                  <TableCell className="font-medium">{row.day}</TableCell>
                  <TableCell>{row.hours}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Custom Slot Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Add Custom Slot</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Day</Label>
              <Input
                placeholder="e.g. Monday"
                value={customSlot.day}
                onChange={(e) =>
                  setCustomSlot({ ...customSlot, day: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={customSlot.start}
                onChange={(e) =>
                  setCustomSlot({ ...customSlot, start: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={customSlot.end}
                onChange={(e) =>
                  setCustomSlot({ ...customSlot, end: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={addCustomSlot}
            >
              Add Slot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
