/**
 * Project Gallery
 * Handles image galleries for project entries
 */

class ProjectGallery {
    constructor() {
        this.galleries = document.querySelectorAll('.project-gallery');
    }

    /**
     * Initialize gallery functionality
     */
    init() {
        this.galleries.forEach(gallery => {
            const mainImage = gallery.querySelector('.gallery-main-image');
            const thumbnails = gallery.querySelectorAll('.gallery-thumbnail');
            
            if (!mainImage || thumbnails.length <= 1) return;
            
            // Add click event to thumbnails
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    // Update main image
                    mainImage.src = thumbnail.src;
                    
                    // Update active thumbnail
                    thumbnails.forEach(thumb => thumb.classList.remove('active'));
                    thumbnail.classList.add('active');
                });
            });
            
            // Add lightbox functionality
            mainImage.addEventListener('click', () => {
                this.openLightbox(gallery);
            });
        });
    }

    /**
     * Open lightbox for gallery
     */
    openLightbox(gallery) {
        const images = Array.from(gallery.querySelectorAll('.gallery-thumbnail')).map(thumb => thumb.src);
        const activeIndex = parseInt(gallery.querySelector('.gallery-thumbnail.active').dataset.index) || 0;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-image-container">
                    <img src="${images[activeIndex]}" class="lightbox-image">
                </div>
                ${images.length > 1 ? `
                <div class="lightbox-controls">
                    <button class="lightbox-prev">&lt;</button>
                    <div class="lightbox-counter"><span class="current">${activeIndex + 1}</span>/${images.length}</div>
                    <button class="lightbox-next">&gt;</button>
                </div>` : ''}
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function handleKeyDown(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleKeyDown);
            } else if (e.key === 'ArrowLeft' && images.length > 1) {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight' && images.length > 1) {
                navigateImage(1);
            }
        });
        
        // Add navigation for multiple images
        if (images.length > 1) {
            const prevBtn = lightbox.querySelector('.lightbox-prev');
            const nextBtn = lightbox.querySelector('.lightbox-next');
            let currentIndex = activeIndex;
            
            const navigateImage = (direction) => {
                currentIndex = (currentIndex + direction + images.length) % images.length;
                lightbox.querySelector('.lightbox-image').src = images[currentIndex];
                lightbox.querySelector('.current').textContent = currentIndex + 1;
            };
            
            prevBtn.addEventListener('click', () => navigateImage(-1));
            nextBtn.addEventListener('click', () => navigateImage(1));
        }
    }
}