/**
 * Gallery Module: Handles image gallery functionality and modal
 */
class GalleryModule {
    constructor(portfolioApp) {
        this.app = portfolioApp;
        this.currentImageIndex = 0;
        this.projectImages = {
            team: 'images/Capstone_Images/Picture1.png',
            client: 'images/Capstone_Images/Picture2.png',
            device: 'images/Capstone_Images/Picture3.png',
            webapp: 'images/Capstone_Images/Picture4.png'
        };
    }

    /**
     * Initialize gallery functionality
     */
    init() {
        this.setupImageGallery();
    }

    /**
     * Set up image gallery event listeners
     */
    setupImageGallery() {
        // Thumbnail click handlers
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                const imageType = e.target.onclick.toString().match(/showImage\('(\w+)'\)/)[1];
                this.showImage(imageType);
            });
        });

        // Modal close handlers
        const modal = document.getElementById('imageModal');
        const closeBtn = document.querySelector('.close-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation in modal
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('imageModal');
            if (modal && modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    /**
     * Show specific image in gallery
     * @param {string} imageType - Type of image to show
     */
    showImage(imageType) {
        const imagePath = this.projectImages[imageType];
        if (!imagePath) return;

        // Update main gallery image
        const mainImage = document.getElementById('main-image');
        if (mainImage) {
            mainImage.src = imagePath;
            mainImage.alt = `${imageType} image`;
        }

        // Update thumbnail states
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
            if (thumb.src && thumb.src.includes(imageType)) {
                thumb.classList.add('active');
            }
        });

        console.log(`🖼️ Showing image: ${imageType}`);
    }

    /**
     * Show image in modal popup
     * @param {string} imageType - Type of image to show in modal
     */
    showModalImage(imageType) {
        const imagePath = this.projectImages[imageType];
        if (!imagePath) return;

        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');

        if (modal && modalImage) {
            modalImage.src = imagePath;
            modalImage.alt = `${imageType} image`;
            modal.classList.add('active');

            // Add fade-in animation
            setTimeout(() => {
                modalImage.style.opacity = '1';
                modalImage.style.transform = 'scale(1)';
            }, 50);
        }
    }

    /**
     * Close the image modal
     */
    closeModal() {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');

        if (modal && modalImage) {
            modalImage.style.opacity = '0';
            modalImage.style.transform = 'scale(0.95)';

            setTimeout(() => {
                modal.classList.remove('active');
            }, 300);
        }
    }

    /**
     * Navigate to next image in modal
     */
    nextImage() {
        const imageTypes = Object.keys(this.projectImages);
        this.currentImageIndex = (this.currentImageIndex + 1) % imageTypes.length;
        const nextImageType = imageTypes[this.currentImageIndex];
        this.showModalImage(nextImageType);
    }

    /**
     * Navigate to previous image in modal
     */
    previousImage() {
        const imageTypes = Object.keys(this.projectImages);
        this.currentImageIndex = this.currentImageIndex === 0 ? imageTypes.length - 1 : this.currentImageIndex - 1;
        const prevImageType = imageTypes[this.currentImageIndex];
        this.showModalImage(prevImageType);
    }
}

export default GalleryModule;