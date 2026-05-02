import Colors from '../utility/Colors';

/**
 * ThemeManager
 * Centralized theme management for Inheritx Solutions applications.
 * Supports typography scales, spacing tokens, and color palettes.
 */
const Theme = {
    colors: {
        primary: Colors.darkBlue || '#0D47A1',
        secondary: Colors.lightBlue || '#03A9F4',
        accent: Colors.orange || '#FF9800',
        background: Colors.white || '#FFFFFF',
        surface: 'rgba(255, 255, 255, 0.85)', // Glassmorphism surface
        text: Colors.lightBlack || '#212121',
        textSecondary: Colors.opacityBlack || 'rgba(0, 0, 0, 0.6)',
        error: Colors.errorText || '#D32F2F',
        border: 'rgba(255, 255, 255, 0.5)',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: '700',
        },
        h2: {
            fontSize: 24,
            fontWeight: '600',
        },
        body: {
            fontSize: 16,
            fontWeight: '400',
        },
        caption: {
            fontSize: 12,
            fontWeight: '400',
        },
    },
    shadows: {
        light: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        premium: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            elevation: 10,
        }
    }
};

export default Theme;
