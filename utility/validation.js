/**
 * Validation Utility
 * Standardized validation logic for Inheritx Solutions applications.
 */

export const validation = (type, value) => {
    const trimmedValue = (value || '').trim();

    switch (type) {
        case 'email':
            if (trimmedValue.length === 0) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedValue)) return 'Please enter a valid email';
            return null;

        case 'firstName':
            if (trimmedValue.length === 0) return 'First name is required';
            if (trimmedValue.length < 2) return 'First name must be at least 2 characters';
            return null;

        case 'lastName':
            if (trimmedValue.length === 0) return 'Last name is required';
            return null;

        case 'zipcode':
            if (trimmedValue.length === 0) return 'Zipcode is required';
            const zipRegex = /^\d{5,6}$/;
            if (!zipRegex.test(trimmedValue)) return 'Please enter a valid zipcode (5-6 digits)';
            return null;

        default:
            return null;
    }
};
