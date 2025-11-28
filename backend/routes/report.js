const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');

// Create a new medical report
router.post('/', async (req, res) => {
  try {
    const id = await Report.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reports for a client
router.get('/client/:clientId', async (req, res) => {
  try {
    const reports = await Report.findByClient(req.params.clientId);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reports created by a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const reports = await Report.findByDoctor(req.params.doctorId);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update report (type/results)
router.put('/:id', async (req, res) => {
  try {
    const success = await Report.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ error: 'Report not found or no changes' });
    res.json({ message: 'Report updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a report
router.delete('/:id', async (req, res) => {
  try {
    const success = await Report.delete(req.params.id);
    if (!success) return res.status(404).json({ error: 'Report not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
