import { validation } from '../validation';

describe('Validation Utility Tests', () => {
    
    test('Email validation - empty value', () => {
        expect(validation('email', '')).toBe('Email is required');
    });

    test('Email validation - invalid format', () => {
        expect(validation('email', 'invalid-email')).toBe('Please enter a valid email');
    });

    test('Email validation - valid format', () => {
        expect(validation('email', 'test@inheritx.com')).toBeNull();
    });

    test('First Name validation - empty value', () => {
        expect(validation('firstName', '')).toBe('First name is required');
    });

    test('Zipcode validation - invalid format', () => {
        expect(validation('zipcode', '123')).toBe('Please enter a valid zipcode (5-6 digits)');
    });

    test('Zipcode validation - valid format', () => {
        expect(validation('zipcode', '123456')).toBeNull();
    });
});
