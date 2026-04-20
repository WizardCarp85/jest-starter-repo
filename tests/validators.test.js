const {
  isValidEmail,
  isStrongPassword,
  isNonEmptyString,
} = require('../../../pp/src/utils/validators');

describe('validators', () => {
  describe('isValidEmail', () => {
    test('valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    test('invalid email', () => {
      expect(isValidEmail('test@')).toBe(false);
    });

    test('whitespace trimmed email', () => {
      expect(isValidEmail('  test@example.com  ')).toBe(true);
    });

    test('empty after trim', () => {
      expect(isValidEmail('   ')).toBe(false);
    });

    test('non-string input', () => {
      expect(isValidEmail(123)).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    test('valid password', () => {
      expect(isStrongPassword('Strong123')).toBe(true);
    });

    test('too short', () => {
      expect(isStrongPassword('S1a')).toBe(false);
    });

    test('missing uppercase', () => {
      expect(isStrongPassword('strong123')).toBe(false);
    });

    test('missing lowercase', () => {
      expect(isStrongPassword('STRONG123')).toBe(false);
    });

    test('missing digit', () => {
      expect(isStrongPassword('StrongPass')).toBe(false);
    });

    test('non-string input', () => {
      expect(isStrongPassword(null)).toBe(false);
    });
  });

  describe('isNonEmptyString', () => {
    test('valid string', () => {
      expect(isNonEmptyString('hello')).toBe(true);
    });

    test('blank string', () => {
      expect(isNonEmptyString('')).toBe(false);
    });

    test('whitespace only', () => {
      expect(isNonEmptyString('   ')).toBe(false);
    });

    test('non-string input', () => {
      expect(isNonEmptyString(123)).toBe(false);
    });
  });
});