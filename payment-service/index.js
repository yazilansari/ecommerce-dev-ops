const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'mysql-service',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_db'
};

app.post('/payment', async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const db = await mysql.createConnection(dbConfig);
    await db.execute('INSERT INTO payments (order_id, amount, status) VALUES (?, ?, ?)', [orderId, amount, 'completed']);
    await db.end();
    res.status(201).json({ message: 'Payment processed', orderId, amount });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed', details: error.message });
  }
});

app.listen(3000, () => console.log('Payment service running on port 3000'));
