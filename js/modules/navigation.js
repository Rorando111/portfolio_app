/**
 * Navigation Module: Handles page flipping and navigation
 */
class NavigationModule {
    constructor(portfolioApp) {
        this.app = portfolioApp;
        this.currentPage = 'cover';
        this.isAnimating = false;
        this.navTabs = null;
        this.bookPages = null;
    }

    /**
     * Initialize navigation functionality
     */
    init() {
        this.navTabs = document.querySelectorAll('.nav-tab');
        this.bookPages = document.querySelectorAll('.book-page');
        this.setupNavigation();
    }

    /**
     * Set up navigation event listeners
     */
    setupNavigation() {
        // Navigation tab clicks
        this.navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetPage = e.target.dataset.page;
                if (targetPage && targetPage !== this.currentPage) {
                    this.flipToPage(targetPage);
                }
            });
        });

        // Keyboard navigation (arrow keys)
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;

            switch(e.key) {
                case 'ArrowLeft':
                    this.previousPage();
                    break;
                case 'ArrowRight':
                    this.nextPage();
                    break;
            }
        });

        // Touch/swipe support for mobile
        this.setupTouchGestures();
    }

    /**
     * Flip to a specific page with animation
     * @param {string} pageId - The target page ID
     */
    flipToPage(pageId) {
        if (this.isAnimating || pageId === this.currentPage) return;

        console.log(`📖 Flipping to page: ${pageId}`);
        this.isAnimating = true;

        // Hide current page
        const currentPageElement = document.getElementById(`${this.currentPage}-page`);
        if (currentPageElement) {
            currentPageElement.classList.add('leaving');
        }

        // Update navigation state
        this.updateNavigation(pageId);

        // Show new page after animation delay
        setTimeout(() => {
            this.showPage(pageId);
        }, 150);
    }

    /**
     * Show the target page
     * @param {string} pageId - The page to show
     */
    showPage(pageId) {
        // Hide all pages
        this.bookPages.forEach(page => {
            page.classList.remove('active', 'leaving');
        });

        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }

        this.isAnimating = false;
        console.log(`✅ Now showing: ${pageId}`);
    }

    /**
     * Update navigation tab states
     * @param {string} activePage - The currently active page
     */
    updateNavigation(activePage) {
        this.navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.page === activePage) {
                tab.classList.add('active');
            }
        });
    }

    /**
     * Navigate to next page
     */
    nextPage() {
        const pages = ['cover', 'about', 'projects', 'contact'];
        const currentIndex = pages.indexOf(this.currentPage);
        const nextIndex = (currentIndex + 1) % pages.length;
        this.flipToPage(pages[nextIndex]);
    }

    /**
     * Navigate to previous page
     */
    previousPage() {
        const pages = ['cover', 'about', 'projects', 'contact'];
        const currentIndex = pages.indexOf(this.currentPage);
        const prevIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1;
        this.flipToPage(pages[prevIndex]);
    }

    /**
     * Set up touch gestures for mobile swipe support
     */
    setupTouchGestures() {
        const bookContainer = document.querySelector('.book-container');
        let startX = 0;
        let startY = 0;
        let threshold = 50; // Minimum swipe distance

        bookContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        bookContainer.addEventListener('touchend', (e) => {
            if (!startX || !startY || this.isAnimating) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Check if horizontal swipe is dominant
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe left - next page
                    this.nextPage();
                } else {
                    // Swipe right - previous page
                    this.previousPage();
                }
            }

            // Reset
            startX = 0;
            startY = 0;
        });
    }
}

export default NavigationModule;