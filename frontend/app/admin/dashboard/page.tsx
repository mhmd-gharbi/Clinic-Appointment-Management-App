import { Card, CardContent } from "@/components/ui/card"

export default function DashboardLayout() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Appointments", value: 12 },
          { label: "Scheduled", value: 32 },
          { label: "Completed", value: 99 },
          { label: "Doctors", value: 109 },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="p-6">
              <div className="text-3xl font-semibold">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
