import { StyleSheet } from 'react-native';
import Colors from '../../utility/Colors';
import { screenHeight, screenWidth } from '../../utility/Scale';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Premium Glassmorphism Card
    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 24,
        padding: 30,
        width: screenWidth - 40,
        alignItems: 'center',
        // Shadow for depth
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
        // Subtle border for glass effect
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    innerView: {
        alignItems: 'center',
    },
    iconStyle: {
        height: screenHeight * 0.25,
        width: screenWidth * 0.6,
        resizeMode: 'contain',
        marginTop: 20,
        marginBottom: 20
    },
    buttonContainer: {
        width: '100%',
        marginTop: 40,
    },
    welcomeText: {
        textAlign: 'center',
        lineHeight: 32,
    },
    noteText: {
        textAlign: 'center',
        lineHeight: 22,
        opacity: 0.7,
    }
});