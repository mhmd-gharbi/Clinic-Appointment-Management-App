const express = require("express")
const router = express.Router()
const Patient = require("../models/patientModel")

// Get all patients
router.get("/", async (req, res) => {
    try {
        const patients = await Patient.findAll()
        res.json(patients)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Create new patient
router.post("/", async (req, res) => {
    try {
        const id = await Patient.create(req.body)
        res.status(201).json({ id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get patient by userId
router.get("/user/:userId", async (req, res) => {
    try {
        const patient = await Patient.findByUserId(req.params.userId)
        if (!patient) return res.status(404).json({ error: "Patient not found" })
        res.json(patient)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Update patient
router.put("/:id", async (req, res) => {
    try {
        const success = await Patient.update(req.params.id, req.body)
        if (!success)
            return res.status(404).json({ error: "Patient not found or no changes" })
        res.json({ message: "Patient updated" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Delete patient
router.delete("/:id", async (req, res) => {
    try {
        const success = await Patient.delete(req.params.id)
        if (!success) return res.status(404).json({ error: "Patient not found" })
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
