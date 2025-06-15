const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const pool = require('./config/db');

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ db: 'connected', result: rows[0].result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const guardianRoutes = require('./routes/guardianRoutes');
app.use('/api/guardians', guardianRoutes);

app.get('/', (req, res) => res.send('Student Pickup API running'));

// Server
const testRoutes = require('./routes/testRoutes');
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
