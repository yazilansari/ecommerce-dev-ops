const { authenticate } = require('../src/auth');

describe('authenticate', () => {
  test('returns token for valid credentials', () => {
    expect(authenticate('admin', 'password')).toEqual({ token: 'fake-token' });
  });

  test('throws error for invalid credentials', () => {
    expect(() => authenticate('wrong', 'wrong')).toThrow('Invalid credentials');
  });
});
