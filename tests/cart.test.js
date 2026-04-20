const {
  calculateCartTotal,
  calculateFinalPrice,
  canCheckout,
} = require('../src/services/cartService');

jest.mock('../src/services/discountService', () => ({
  applyDiscount: jest.fn(),
}));

const { applyDiscount } = require('../src/services/discountService');

describe('cartService', () => {
  describe('calculateCartTotal', () => {
    test('calculates total correctly', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 1 },
      ];
      expect(calculateCartTotal(items)).toBe(25);
    });

    test('throws if items not array', () => {
      expect(() => calculateCartTotal(null)).toThrow('Items must be an array');
    });

    test('throws for invalid item structure', () => {
      const items = [{ price: 10 }];
      expect(() => calculateCartTotal(items)).toThrow(
        'Each item must have valid price and quantity'
      );
    });

    test('throws for negative values', () => {
      const items = [{ price: -1, quantity: 2 }];
      expect(() => calculateCartTotal(items)).toThrow(
        'Price and quantity cannot be negative'
      );
    });
  });

  describe('calculateFinalPrice', () => {
    test('applies discount on total', () => {
      applyDiscount.mockReturnValue(80);
      const items = [{ price: 100, quantity: 1 }];
      const result = calculateFinalPrice(items, 20);
      expect(applyDiscount).toHaveBeenCalledWith(100, 20);
      expect(result).toBe(80);
    });
  });

  describe('canCheckout', () => {
    test('true for valid items', () => {
      const items = [{ price: 10, quantity: 1 }];
      expect(canCheckout(items)).toBe(true);
    });

    test('false if not array', () => {
      expect(canCheckout(null)).toBe(false);
    });

    test('false if empty array', () => {
      expect(canCheckout([])).toBe(false);
    });

    test('false if any quantity <= 0', () => {
      const items = [{ price: 10, quantity: 0 }];
      expect(canCheckout(items)).toBe(false);
    });
  });
});