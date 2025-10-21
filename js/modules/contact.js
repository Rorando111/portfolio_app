/**
 * Contact Module: Handles contact form validation and submission
 */
class ContactModule {
    constructor(portfolioApp) {
        this.app = portfolioApp;
    }

    /**
     * Initialize contact form functionality
     */
    init() {
        this.setupContactForm();
    }

    /**
     * Set up contact form event listeners
     */
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });

            // Real-time form validation
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    /**
     * Handle contact form submission
     * @param {HTMLFormElement} form - The form element
     */
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        // Validate form
        if (!this.validateForm(name, email, message)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual backend)
        setTimeout(() => {
            this.showNotification('Message sent successfully! 🎉', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);

        console.log('📧 Form submitted:', { name, email, message });
    }

    /**
     * Validate form fields
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} message - User's message
     * @returns {boolean} - Whether form is valid
     */
    validateForm(name, email, message) {
        let isValid = true;

        if (!name) {
            this.showFieldError('name', 'Name is required');
            isValid = false;
        }

        if (!email) {
            this.showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }

        if (!message) {
            this.showFieldError('message', 'Message is required');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - Whether email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show field error message
     * @param {string} fieldId - ID of the field
     * @param {string} message - Error message
     */
    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        // Remove existing error
        this.clearFieldError(field);

        // Add error class
        field.style.borderColor = '#e74c3c';

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;

        field.parentNode.appendChild(errorDiv);
    }

    /**
     * Clear field error state
     * @param {HTMLElement} field - Field element
     */
    clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Show notification message
     * @param {string} message - Message to show
     * @param {string} type - Type of notification (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

export default ContactModule;