'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({ productId: '', quantity: 1 });

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_PRODUCTS_API_URL || 'http://api.next.local:8080/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const createOrder = async () => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_ORDERS_API_URL || 'http://api.next.local:8080/orders', {
        userId: 1, // Hardcoded for demo
        productId: order.productId,
        quantity: order.quantity
      });
      alert('Order created: ' + res.data.orderId);
    } catch (err) {
      alert('Order creation failed: ' + err.message);
    }
  };

  return (
    <div>
      <h1>E-commerce Store</h1>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => setOrder({ ...order, productId: product.id })}>Select</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="number"
          value={order.quantity}
          onChange={e => setOrder({ ...order, quantity: parseInt(e.target.value) })}
          min="1"
        />
        <button onClick={createOrder}>Create Order</button>
      </div>
    </div>
  );
}
