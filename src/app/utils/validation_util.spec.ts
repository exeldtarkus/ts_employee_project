import {validateEmail, validatePhonenumber} from './validation_util';

describe('Test Validation', () => {
  describe('Test Validate Email', () => {
    it('Email is valid', () => {
      expect(validateEmail('jimmy.dumalang@adira.co.id')).toBe(true);
    });
    it('Email is invalid', () => {
      expect(validateEmail('48392048')).toBe(false);
    });
  });

  describe('Test Validate Phone Number', () => {
    it('Phone number is valid', () => {
      expect(validatePhonenumber('081290716322')).toBe(true);
    });
    it('Phone number is invalid', () => {
      expect(validatePhonenumber('jimmy.dumalang@adira.co.id')).toBe(false);
    });
  });
});
