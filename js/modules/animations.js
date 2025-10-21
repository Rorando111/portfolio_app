/**
 * Animations Module: Handles scroll and interaction effects
 */
class AnimationsModule {
    constructor(portfolioApp) {
        this.app = portfolioApp;
    }

    /**
     * Initialize animation functionality
     */
    init() {
        this.setupAnimations();
    }

    /**
     * Set up all animation effects
     */
    setupAnimations() {
        // Intersection Observer for scroll animations
        this.setupScrollAnimations();

        // Parallax effect for book pages
        this.setupParallaxEffect();

        // Smooth reveal animations
        this.setupRevealAnimations();
    }

    /**
     * Set up scroll-triggered animations
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const animateElements = document.querySelectorAll('.project-card, .skill-tag, .contact-item');
        animateElements.forEach(el => observer.observe(el));
    }

    /**
     * Set up subtle parallax effect
     */
    setupParallaxEffect() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.page-content');

            parallaxElements.forEach(el => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestParallaxUpdate);
    }

    /**
     * Set up reveal animations for elements
     */
    setupRevealAnimations() {
        // Add CSS for reveal animations
        const style = document.createElement('style');
        style.textContent = `
            .project-card, .skill-tag, .contact-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

export default AnimationsModule;