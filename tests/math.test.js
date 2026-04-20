const { sum, subtract, multiply, divide } = require('../../pp/src/utils/math');

describe('math utils', () => {
  test('sum', () => {
    expect(sum(4, 2)).toBe(6);
  });

  test('subtract', () => {
    expect(subtract(4, 2)).toBe(2);
  });

  test('multiply', () => {
    expect(multiply(4, 2)).toBe(8);
  });

  test('divide', () => {
    expect(divide(4, 2)).toBe(2);
  });

  test('divide by 0 throws error', () => {
    expect(() => divide(4, 0)).toThrow('Division by zero is not allowed');
  });
});