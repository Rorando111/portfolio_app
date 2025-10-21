/**
 * ==========================================
 * FLIPBOOK PORTFOLIO: Main JavaScript
 * Professional flipbook interactions and animations
 * ==========================================
 */

import NavigationModule from './modules/navigation.js';
import GalleryModule from './modules/gallery.js';
import ContactModule from './modules/contact.js';
import AnimationsModule from './modules/animations.js';
import UtilsModule from './modules/utils.js';

// Global state management
class PortfolioApp {
    constructor() {
        this.currentPage = 'cover';
        this.isAnimating = false;

        this.init();
    }

    /**
     * Initialize the application
     * Sets up event listeners and starts the app
     */
    init() {
        console.log('🚀 Portfolio App Initializing...');

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    /**
     * Set up the main application functionality
     */
    setupApp() {
        // Initialize all modules
        this.navigation = new NavigationModule(this);
        this.gallery = new GalleryModule(this);
        this.contact = new ContactModule(this);
        this.animations = new AnimationsModule(this);
        this.utils = new UtilsModule(this);

        // Initialize modules
        this.navigation.init();
        this.gallery.init();
        this.contact.init();
        this.animations.init();
        this.utils.init();

        console.log('✅ Portfolio App Ready!');
    }

    /**
     * Global method to flip to a page (called from HTML)
     * @param {string} pageId - Page to flip to
     */
    flipToPage(pageId) {
        this.navigation.flipToPage(pageId);
    }

    /**
     * Global method to show image (called from HTML)
     * @param {string} imageType - Type of image to show
     */
    showModalImage(imageType) {
        this.gallery.showModalImage(imageType);
    }

    /**
     * Global method to close modal (called from HTML)
     */
    closeModal() {
        this.gallery.closeModal();
    }
}

// ==========================================
// GLOBAL FUNCTIONS: Exposed to HTML
// ==========================================

/**
 * Global function to flip to a page (called from HTML)
 * @param {string} pageId - Page to flip to
 */
function flipToPage(pageId) {
    if (window.portfolioApp) {
        window.portfolioApp.flipToPage(pageId);
    }
}

/**
 * Global function to show image (called from HTML)
 * @param {string} imageType - Type of image to show
 */
function showImage(imageType) {
    if (window.portfolioApp) {
        window.portfolioApp.showModalImage(imageType);
    }
}

/**
 * Global function to close modal (called from HTML)
 */
function closeModal() {
    if (window.portfolioApp) {
        window.portfolioApp.closeModal();
    }
}

// ==========================================
// INITIALIZE APPLICATION
// ==========================================

// Create and start the application
window.portfolioApp = new PortfolioApp();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
