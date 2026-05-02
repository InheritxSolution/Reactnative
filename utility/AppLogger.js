/**
 * AppLogger Utility
 * A professional logging service for Inheritx Solutions showcases.
 * Supports categories, severity levels, and environment-based filtering.
 */

const LOG_LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

const CATEGORIES = {
    API: '🌐 API',
    AUTH: '🔐 AUTH',
    UI: '🎨 UI',
    REDUX: '🧩 REDUX',
    GENERAL: '📋 GENERAL',
};

class AppLogger {
    static isEnabled = __DEV__; // Only log in development mode by default

    /**
     * Internal log formatter
     */
    static _log(level, category, message, data = null) {
        if (!this.isEnabled) return;

        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level}] [${category}]`;

        if (data) {
            console.log(prefix, message, data);
        } else {
            console.log(prefix, message);
        }
    }

    static debug(category, message, data) {
        this._log(LOG_LEVELS.DEBUG, category, message, data);
    }

    static info(category, message, data) {
        this._log(LOG_LEVELS.INFO, category, message, data);
    }

    static warn(category, message, data) {
        this._log(LOG_LEVELS.WARN, category, message, data);
    }

    static error(category, message, data) {
        this._log(LOG_LEVELS.ERROR, category, message, data);
        
        // Premium: Here you could integrate with services like Sentry or Bugsnag
        // if (level === LOG_LEVELS.ERROR) Sentry.captureMessage(message);
    }
}

export { AppLogger, CATEGORIES };
