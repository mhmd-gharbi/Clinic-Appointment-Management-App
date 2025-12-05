import Link from "next/link"

const items = ["Dashboard", "Appointments", "Documents", "Settings"]

export default function PatientSidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-6">
      <div className="text-2xl font-bold text-blue-600">Clinic.</div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item}
            href={`/patient/${item.toLowerCase()}`}
            className="block p-2 rounded-lg hover:bg-blue-50"
          >
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
