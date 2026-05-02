import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { AppLogger, CATEGORIES } from './AppLogger';

/**
 * BiometricManager Utility
 * Handles secure biometric authentication for Inheritx Solutions applications.
 */
class BiometricManager {
    static rnBiometrics = new ReactNativeBiometrics();

    /**
     * Check if biometrics are available on the device
     */
    static async checkAvailability() {
        try {
            const { available, biometryType } = await this.rnBiometrics.isSensorAvailable();
            
            if (available) {
                AppLogger.info(CATEGORIES.AUTH, `Biometrics available: ${biometryType}`);
                return { available: true, type: biometryType };
            }
            
            AppLogger.warn(CATEGORIES.AUTH, "Biometrics not available on this device");
            return { available: false, type: null };
        } catch (error) {
            AppLogger.error(CATEGORIES.AUTH, "Error checking biometric availability", error);
            return { available: false, type: null };
        }
    }

    /**
     * Authenticate the user using biometrics
     */
    static async authenticate(promptMessage = 'Authenticate to continue') {
        try {
            const { available } = await this.checkAvailability();
            if (!available) throw new Error("Biometrics not available");

            const { success, error } = await this.rnBiometrics.simplePrompt({
                promptMessage: promptMessage,
            });

            if (success) {
                AppLogger.info(CATEGORIES.AUTH, "Biometric authentication successful");
                return true;
            } else {
                AppLogger.warn(CATEGORIES.AUTH, `Biometric authentication failed: ${error}`);
                return false;
            }
        } catch (error) {
            AppLogger.error(CATEGORIES.AUTH, "Biometric authentication error", error);
            return false;
        }
    }
}

export default BiometricManager;
