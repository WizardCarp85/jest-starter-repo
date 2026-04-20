const {
  calculateDiscount,
  applyDiscount,
  getCouponDiscountPercentage,
} = require('../src/services/discountService');

describe('discountService', () => {
  describe('calculateDiscount', () => {
    test('calculates correctly', () => {
      expect(calculateDiscount(100, 10)).toBe(10);
    });

    test('throws for non-number inputs', () => {
      expect(() => calculateDiscount('100', 10)).toThrow(
        'Price and percentage must be numbers'
      );
    });

    test('throws for negative price', () => {
      expect(() => calculateDiscount(-1, 10)).toThrow(
        'Price cannot be negative'
      );
    });

    test('throws for invalid percentage', () => {
      expect(() => calculateDiscount(100, 200)).toThrow(
        'Percentage must be between 0 and 100'
      );
    });
  });

  describe('applyDiscount', () => {
    test('applies discount correctly', () => {
      expect(applyDiscount(100, 10)).toBe(90);
    });
  });

  describe('getCouponDiscountPercentage', () => {
    test('returns correct percentage for valid coupon', () => {
      expect(getCouponDiscountPercentage('SAVE10')).toBe(10);
      expect(getCouponDiscountPercentage('SAVE20')).toBe(20);
      expect(getCouponDiscountPercentage('FESTIVE30')).toBe(30);
    });

    test('returns 0 for invalid coupon', () => {
      expect(getCouponDiscountPercentage('INVALID')).toBe(0);
    });
  });
});