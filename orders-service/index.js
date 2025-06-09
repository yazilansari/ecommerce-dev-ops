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

app.post('/orders', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const db = await mysql.createConnection(dbConfig);
    await db.execute('INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)', [userId, productId, quantity, 'pending']);
    const [rows] = await db.execute('SELECT LAST_INSERT_ID() as id');
    await db.end();
    res.status(201).json({ message: 'Order created', orderId: rows[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Order creation failed', details: error.message });
  }
});

app.listen(3000, () => console.log('Orders service running on port 3000'));
