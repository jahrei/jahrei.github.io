/**
 * Wallpaper Lightbox Functionality
 * Enables lightbox/fullscreen view for wallpapers in the archive
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize lightbox for all wallpaper previews
    initWallpaperLightbox();
});

/**
 * Initialize lightbox functionality for wallpaper previews
 */
function initWallpaperLightbox() {
    const wallpaperPreviews = document.querySelectorAll('.wallpaper-preview');
    
    wallpaperPreviews.forEach(preview => {
        // Find the image in the preview
        const img = preview.querySelector('img');
        if (img) {
            // Make the preview clickable
            preview.style.cursor = 'pointer';
            
            // Add click event to open lightbox
            preview.addEventListener('click', () => {
                const fullsizeUrl = img.src;
                const title = preview.closest('.wallpaper-card').querySelector('.wallpaper-title').textContent;
                openWallpaperLightbox(fullsizeUrl, title);
            });
        }
    });
}

/**
 * Open lightbox with the wallpaper image
 * @param {string} imageUrl - URL of the image to display
 * @param {string} title - Title of the wallpaper
 */
function openWallpaperLightbox(imageUrl, title) {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-image-container">
                <img src="${imageUrl}" class="lightbox-image" alt="${title}">
            </div>
            <div class="lightbox-caption">${title}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    }
    
    function closeLightbox() {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
    }
}