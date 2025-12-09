const express = require("express")
const router = express.Router()
const Doctor = require("../models/doctorModel")

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.findAll()
    res.json(doctors)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create new doctor
router.post("/", async (req, res) => {
  try {
    const id = await Doctor.create(req.body)
    res.status(201).json({ id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get doctor by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const doctor = await Doctor.findByUserId(req.params.userId)
    if (!doctor) return res.status(404).json({ error: "Doctor not found" })
    res.json(doctor)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get doctors by specialty
router.get("/specialty/:specialty", async (req, res) => {
  try {
    const doctors = await Doctor.findBySpecialty(req.params.specialty)
    res.json(doctors)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update doctor specialty
router.put("/:id/specialty", async (req, res) => {
  try {
    const { specialty } = req.body
    const success = await Doctor.updateSpecialty(req.params.id, specialty)
    if (!success)
      return res.status(404).json({ error: "Doctor not found or no changes" })
    res.json({ message: "Doctor specialty updated" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete doctor
router.delete("/:id", async (req, res) => {
  try {
    const success = await Doctor.delete(req.params.id)
    if (!success) return res.status(404).json({ error: "Doctor not found" })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
