const users = require("./models/userModel")
const doctors = require("./models/doctorModel")
const appointments = require("./models/appointmentModel") // fixed typo

async function testInsert() {
  const userId = await users.create({
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "123456",
    phone: "1234567890",
  })

  console.log({ userId, doctorId, appointmentId })
}

testInsert()
