// orders-service/src/auth.js
const authenticate = (username, password) => {
  if (username === 'admin' && password === 'password') {
    return { token: 'fake-token' };
  }
  throw new Error('Invalid credentials');
};

module.exports = { authenticate };

