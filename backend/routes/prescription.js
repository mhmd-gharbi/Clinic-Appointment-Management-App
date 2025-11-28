const express = require('express');
const router = express.Router();
const Prescription = require('../models/prescriptionModel');

// Create a new prescription
router.post('/', async (req, res) => {
  try {
    const id = await Prescription.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all prescriptions for a client
router.get('/client/:clientId', async (req, res) => {
  try {
    const prescriptions = await Prescription.findByClient(req.params.clientId);
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all prescriptions by a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const prescriptions = await Prescription.findByDoctor(req.params.doctorId);
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get prescription by appointment ID
router.get('/appointment/:appointmentId', async (req, res) => {
  try {
    const prescription = await Prescription.findByAppointment(req.params.appointmentId);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update prescription
router.put('/:id', async (req, res) => {
  try {
    const success = await Prescription.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ error: 'Prescription not found or no changes' });
    res.json({ message: 'Prescription updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a prescription
router.delete('/:id', async (req, res) => {
  try {
    const success = await Prescription.delete(req.params.id);
    if (!success) return res.status(404).json({ error: 'Prescription not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
