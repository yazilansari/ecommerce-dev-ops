/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_PRODUCTS_API_URL: 'http://api.172-18-0-3.nip.io/products',
    NEXT_PUBLIC_ORDERS_API_URL: 'http://api.172-18-0-3.nip.io/orders',
    NEXT_PUBLIC_PAYMENT_API_URL: 'http://api.172-18-0-3.nip.io/payment',
    NEXT_PUBLIC_AUTH_API_URL: 'http://api.172-18-0-3.nip.io/auth'
  }
};

export default nextConfig;


