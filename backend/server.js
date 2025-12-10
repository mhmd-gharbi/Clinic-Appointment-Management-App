require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend is running!")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const appointmentRoutes = require('./routes/appointment');
app.use('/api/appointments', appointmentRoutes);

const doctorRoutes = require('./routes/doctor');
app.use('/api/doctors', doctorRoutes);

const messageRoutes = require('./routes/message');
app.use('/api/messages', messageRoutes);

const prescriptionRoutes = require('./routes/prescription');
app.use('/api/prescriptions', prescriptionRoutes);

const reportRoutes = require('./routes/report');
app.use('/api/reports', reportRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


const referralRoutes = require('./routes/referral');
app.use('/api/referrals', referralRoutes);

const patientRoutes = require('./routes/patient');
app.use('/api/patients', patientRoutes);