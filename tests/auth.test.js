const { registerUser, loginUser } = require('../../../pp/src/services/authService');

describe('authService', () => {
  describe('registerUser', () => {
    test('happy path', () => {
      const res = registerUser({
        name: 'John',
        email: 'john@example.com',
        password: 'Strong123',
      });
      expect(res.success).toBe(true);
    });

    test('missing name', () => {
      const res = registerUser({
        name: '',
        email: 'john@example.com',
        password: 'Strong123',
      });
      expect(res.success).toBe(false);
      expect(res.message).toBe('Name is required');
    });

    test('invalid email', () => {
      const res = registerUser({
        name: 'John',
        email: 'john@',
        password: 'Strong123',
      });
      expect(res.success).toBe(false);
      expect(res.message).toBe('Invalid email');
    });

    test('weak password', () => {
      const res = registerUser({
        name: 'John',
        email: 'john@example.com',
        password: 'weak',
      });
      expect(res.success).toBe(false);
      expect(res.message).toBe('Password is not strong enough');
    });

    test('invalid user input type', () => {
      const res = registerUser(null);
      expect(res.success).toBe(false);
      expect(res.message).toBe('User data is required');
    });
  });

  describe('loginUser', () => {
    test('success case', () => {
      const res = loginUser('student@demo.com', 'Password123');
      expect(res.success).toBe(true);
    });

    test('invalid email format', () => {
      const res = loginUser('invalid-email', 'Password123');
      expect(res.success).toBe(false);
      expect(res.message).toBe('Invalid email format');
    });

    test('missing password', () => {
      const res = loginUser('student@demo.com', '');
      expect(res.success).toBe(false);
      expect(res.message).toBe('Password is required');
    });

    test('wrong credentials', () => {
      const res = loginUser('student@demo.com', 'Wrong123');
      expect(res.success).toBe(false);
      expect(res.message).toBe('Invalid credentials');
    });
  });
});