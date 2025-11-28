const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Send a new message
router.post('/', async (req, res) => {
  try {
    const id = await Message.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages received by a user
router.get('/received/:userId', async (req, res) => {
  try {
    const messages = await Message.findByReceiver(req.params.userId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages sent by a user
router.get('/sent/:userId', async (req, res) => {
  try {
    const messages = await Message.findBySender(req.params.userId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const success = await Message.delete(req.params.id);
    if (!success) return res.status(404).json({ error: 'Message not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
