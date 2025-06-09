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

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get('/products', async (req, res) => {
  try {
    const db = await mysql.createConnection(dbConfig);
    const [products] = await db.execute('SELECT * FROM products');
    await db.end();
    console.log('Fetching products:', products);
    res.json(products);
  } catch (error) {
    console.error('Error in /products endpoint:', error.stack);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const db = await mysql.createConnection(dbConfig);
    await db.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    await db.end();
    res.status(201).json({ message: 'Product added', name, price });
  } catch (error) {
    console.error('Error in /products endpoint:', error.stack);
    res.status(500).json({ error: 'Product creation failed', details: error.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(3000, () => console.log('Products service running on port 3000'));
