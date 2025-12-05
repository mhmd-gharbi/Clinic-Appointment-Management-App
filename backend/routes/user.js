const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Create a new user (admin, doctor, or client)
router.post('/', async (req, res) => {
  try {
    const id = await User.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find user by email
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findByEmail(req.params.email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find user by phone
router.get('/phone/:phone', async (req, res) => {
  try {
    const user = await User.findByPhone(req.params.phone);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users by role (admin, doctor, client)
router.get('/role/:role', async (req, res) => {
  try {
    const users = await User.findByRole(req.params.role);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const success = await User.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ error: 'User not found or no changes' });
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const success = await User.delete(req.params.id);
    if (!success) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
