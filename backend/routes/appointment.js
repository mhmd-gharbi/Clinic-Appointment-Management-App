const express = require('express');
const router = express.Router();

// Test route for appointments
router.get('/', (req, res) => {
  res.send("Appointment route is working!");
});

module.exports = router;
