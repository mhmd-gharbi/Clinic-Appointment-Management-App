const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");

// Get all appointments (Admin)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get appointments for a specific client
router.get("/client/:clientId", async (req, res) => {
  try {
    const appointments = await Appointment.findByClient(req.params.clientId);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get appointments for a specific doctor
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const appointments = await Appointment.findByDoctor(req.params.doctorId);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new appointment
router.post("/", async (req, res) => {
  try {
    const id = await Appointment.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update appointment
router.put("/:id", async (req, res) => {
  try {
    const success = await Appointment.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ error: "Appointment not found" });
    res.json({ message: "Appointment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel appointment
router.put("/:id/cancel", async (req, res) => {
  try {
    const success = await Appointment.cancel(req.params.id);
    if (!success) return res.status(404).json({ error: "Appointment not found" });
    res.json({ message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const success = await Appointment.delete(req.params.id);
    if (!success) return res.status(404).json({ error: "Appointment not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
