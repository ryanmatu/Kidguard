// routes/guardianRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { protect, authorize } = require('../middlewares/authMiddleware.js');

// 🟢 Get all students linked to a guardian
router.get('/students', protect, authorize('guardian'), async (req, res) => {
  const { user_id } = req.user;

  try {
    const [rows] = await db.query(`
      SELECT s.student_id, s.name, s.class, gs.is_primary
      FROM students s
      JOIN guardian_student gs ON gs.student_id = s.student_id
      WHERE gs.guardian_id = ?`, [user_id]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Add another guardian to the same student (only by primary guardian)
router.post('/:studentId/guardians', protect, authorize('guardian'), async (req, res) => {
  const { user_id } = req.user;
  const { studentId } = req.params;
  const { newGuardianId } = req.body;

  try {
    // Check if current user is primary guardian
    const [rows] = await db.query(`
      SELECT * FROM guardian_student
      WHERE student_id = ? AND guardian_id = ? AND is_primary = TRUE
    `, [studentId, user_id]);

    if (rows.length === 0) {
      return res.status(403).json({ message: 'Only the primary guardian can add others.' });
    }

    // Insert new guardian
    await db.query(`
      INSERT INTO guardian_student (student_id, guardian_id)
      VALUES (?, ?)`, [studentId, newGuardianId]);

    res.json({ message: 'Guardian linked to student' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Set a new primary guardian (admin only)
router.put('/:studentId/primary/:guardianId', protect, authorize('admin'), async (req, res) => {
  const { studentId, guardianId } = req.params;

  try {
    // Reset all to non-primary
    await db.query(`UPDATE guardian_student SET is_primary = FALSE WHERE student_id = ?`, [studentId]);

    // Set the new one
    await db.query(`UPDATE guardian_student SET is_primary = TRUE WHERE student_id = ? AND guardian_id = ?`, [studentId, guardianId]);

    res.json({ message: 'Primary guardian updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
