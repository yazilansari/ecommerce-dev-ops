const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'mysql-service',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_db'
};

app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await mysql.createConnection(dbConfig);
    const [users] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    await db.end();
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: users[0].id }, process.env.JWT_SECRET || 'secretkey123', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

app.listen(3000, () => console.log('Auth service running on port 3000'));
