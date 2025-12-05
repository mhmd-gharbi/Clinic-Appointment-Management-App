const express = require('express');
const router = express.Router();
const Referral = require('../models/referralModel');

// Create a new referral
router.post('/', async (req, res) => {
  try {
    const id = await Referral.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all referrals for a client (patient)
router.get('/client/:clientId', async (req, res) => {
  try {
    const referrals = await Referral.findByClient(req.params.clientId);
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all referrals sent by a doctor
router.get('/from-doctor/:fromDoctorId', async (req, res) => {
  try {
    const referrals = await Referral.findByFromDoctor(req.params.fromDoctorId);
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all referrals received by a doctor
router.get('/to-doctor/:toDoctorId', async (req, res) => {
  try {
    const referrals = await Referral.findByToDoctor(req.params.toDoctorId);
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get referral by ID
router.get('/:id', async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) return res.status(404).json({ error: 'Referral not found' });
    res.json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a referral
router.put('/:id', async (req, res) => {
  try {
    const success = await Referral.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ error: 'Referral not found or no changes' });
    res.json({ message: 'Referral updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a referral
router.delete('/:id', async (req, res) => {
  try {
    const success = await Referral.delete(req.params.id);
    if (!success) return res.status(404).json({ error: 'Referral not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
