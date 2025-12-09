const pool = require("../config/db")
const { faker } = require("@faker-js/faker")

const NUM_DOCTORS = 50
const NUM_PATIENTS = 200
const NUM_APPOINTMENTS = 300

async function seed() {
  const connection = await pool.getConnection()

  try {
    console.log("Seeding dataset...")

    await connection.query("SET FOREIGN_KEY_CHECKS = 0")

    await connection.query("TRUNCATE TABLE referrals")
    await connection.query("TRUNCATE TABLE prescriptions")
    await connection.query("TRUNCATE TABLE reports")
    await connection.query("TRUNCATE TABLE appointments")
    await connection.query("TRUNCATE TABLE doctors")
    await connection.query("TRUNCATE TABLE users")

    await connection.query("SET FOREIGN_KEY_CHECKS = 1")

    // ---------------- USERS ----------------
    const users = []

    // Doctors
    for (let i = 0; i < NUM_DOCTORS; i++) {
      users.push([
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        "hashedpass",
        faker.phone.number(),
        "doctor",
      ])
    }

    // Patients
    for (let i = 0; i < NUM_PATIENTS; i++) {
      users.push([
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        "hashedpass",
        faker.phone.number(),
        "client",
      ])
    }

    await connection.query(
      `INSERT INTO users (first_name,last_name,email,password,phone,role) VALUES ?`,
      [users]
    )

    // ---------------- DOCTORS ----------------
    const doctors = []

    for (let i = 1; i <= NUM_DOCTORS; i++) {
      doctors.push([
        i,
        faker.helpers.arrayElement([
          "Dermatology",
          "Cardiology",
          "General",
          "Orthopedics",
          "Neurology",
          "Pediatrics",
          "Radiology",
        ]),
      ])
    }

    await connection.query(
      `INSERT INTO doctors (user_id, specialty) VALUES ?`,
      [doctors]
    )

    // ---------------- APPOINTMENTS ----------------
    const appointments = []

    for (let i = 0; i < NUM_APPOINTMENTS; i++) {
      const clientId = faker.number.int({
        min: NUM_DOCTORS + 1,
        max: NUM_DOCTORS + NUM_PATIENTS,
      })

      const doctorId = faker.number.int({
        min: 1,
        max: NUM_DOCTORS,
      })

      const date = faker.date.future()

      appointments.push([
        clientId,
        doctorId,
        date.toISOString().slice(0, 10),
        date.toISOString().slice(11, 19),
        faker.helpers.arrayElement(["normal", "urgent"]),
        faker.helpers.arrayElement(["scheduled", "completed", "cancelled"]),
      ])
    }

    const [apptResult] = await connection.query(
      `INSERT INTO appointments (client_id, doctor_id, date, time, type, status)
       VALUES ?`,
      [appointments]
    )

    const appointmentIds = Array.from(
      { length: NUM_APPOINTMENTS },
      (_, i) => apptResult.insertId + i
    )

    // ---------------- REPORTS ----------------
    const reports = []

    for (let i = 0; i < NUM_APPOINTMENTS / 2; i++) {
      const id = faker.helpers.arrayElement(appointmentIds)

      reports.push([
        faker.number.int({
          min: NUM_DOCTORS + 1,
          max: NUM_DOCTORS + NUM_PATIENTS,
        }),
        faker.number.int({ min: 1, max: NUM_DOCTORS }),
        faker.helpers.arrayElement(["Blood", "X-ray", "MRI", "Urine", "Covid"]),
        faker.lorem.paragraph(),
        faker.date.recent().toISOString().slice(0, 10),
      ])
    }

    await connection.query(
      `INSERT INTO reports (client_id, doctor_id, type, results, issued_at)
       VALUES ?`,
      [reports]
    )

    // ---------------- PRESCRIPTIONS ----------------
    const prescriptions = []

    for (let i = 0; i < NUM_APPOINTMENTS / 2; i++) {
      prescriptions.push([
        faker.helpers.arrayElement(appointmentIds),
        faker.number.int({ min: 1, max: NUM_DOCTORS }),
        faker.number.int({
          min: NUM_DOCTORS + 1,
          max: NUM_DOCTORS + NUM_PATIENTS,
        }),
        faker.helpers
          .arrayElements(
            ["Paracetamol", "Ibuprofen", "Amoxicillin", "Vitamin C", "Insulin"],
            faker.number.int({ min: 1, max: 3 })
          )
          .join(", "),
        faker.lorem.sentence(),
        faker.date.recent().toISOString().slice(0, 10),
      ])
    }

    await connection.query(
      `INSERT INTO prescriptions
       (appointment_id, doctor_id, client_id, medicines, instructions, issued_at)
       VALUES ?`,
      [prescriptions]
    )

    // ---------------- REFERRALS ----------------
    const referrals = []

    for (let i = 0; i < NUM_APPOINTMENTS / 3; i++) {
      referrals.push([
        faker.helpers.arrayElement(appointmentIds),
        faker.number.int({ min: 1, max: NUM_DOCTORS }),
        faker.number.int({ min: 1, max: NUM_DOCTORS }),
        faker.number.int({
          min: NUM_DOCTORS + 1,
          max: NUM_DOCTORS + NUM_PATIENTS,
        }),
        faker.lorem.sentence(),
        faker.date.recent().toISOString().slice(0, 10),
      ])
    }

    await connection.query(
      `INSERT INTO referrals
       (appointment_id, from_doctor_id, to_doctor_id, client_id, reason, created_at)
       VALUES ?`,
      [referrals]
    )

    console.log("✅ Seeding finished.")
    console.log("Doctors:", NUM_DOCTORS)
    console.log("Patients:", NUM_PATIENTS)
    console.log("Appointments:", NUM_APPOINTMENTS)
  } catch (err) {
    console.error(err)
  } finally {
    connection.release()
    process.exit()
  }
}

seed()
