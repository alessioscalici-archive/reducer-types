const { validate } = require('../../../src/types/number');


it('should return true if the value is null', () => {
  expect(validate(null)).toBe(true);
});

it('should return true if the value is a number', () => {
  expect(validate(0)).toBe(true);
  expect(validate(42)).toBe(true);
  expect(validate(-42)).toBe(true);
  expect(validate(-Infinity)).toBe(true);
  expect(validate(Infinity)).toBe(true);
});

it('should return false if the value is an instance of class Number', () => {
  expect(validate(new Number(17))).toBe(false);
});

it('should return false if the value is NaN (Not a Number)', () => {
  expect(validate(NaN)).toBe(false);
});

it('should return false if the value is a type different than number', () => {
  expect(validate(true)).toBe(false);
  expect(validate('[]')).toBe(false);
  expect(validate(new Date())).toBe(false);
  expect(validate({})).toBe(false);
});
