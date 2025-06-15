const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');

// Everyone with a valid token
router.get('/profile', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.role}!`, user: req.user });
});

// Only Admin
router.get('/admin-only', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

module.exports = router;
