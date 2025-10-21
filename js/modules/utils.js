/**
 * Utils Module: Helper functions and utilities
 */
class UtilsModule {
    constructor(portfolioApp) {
        this.app = portfolioApp;
        this.loader = document.querySelector('.page-loader');
    }

    /**
     * Initialize utility functions
     */
    init() {
        this.hideLoader();
    }

    /**
     * Hide the loading screen
     */
    hideLoader() {
        setTimeout(() => {
            if (this.loader) {
                this.loader.classList.add('hidden');
            }
        }, 1000);
    }

    /**
     * Debounce function for performance
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

export default UtilsModule;