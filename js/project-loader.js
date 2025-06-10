/**
 * Project Loader
 * Dynamically loads project entries from JSON files in the projects directory
 */

class ProjectLoader {
    constructor(category) {
        this.category = category;
        this.projectsContainer = document.querySelector('.projects-grid');
        this.projectsPath = `/projects/${category}/`;
        this.projects = []; // Store loaded projects
        this.currentExpandedProject = null;
    }

    /**
     * Initialize the project loader
     */
    async init() {
        try {
            // Fetch the index file for this category
            const response = await fetch(`${this.projectsPath}index.json`);
            if (!response.ok) {
                throw new Error(`Failed to load project index: ${response.status}`);
            }
            
            const projectIndex = await response.json();
            await this.loadProjects(projectIndex.projects);
            
            // Create project overlay container for expanded view
            this.createProjectOverlay();
            
            // Initialize project card click functionality
            this.initProjectCardClicks();
            
            // Initialize gallery functionality if available
            if (typeof ProjectGallery !== 'undefined') {
                new ProjectGallery().init();
            }
            
            // Initialize filter functionality if on software page
            if (this.category === 'software' && document.querySelector('.filter-buttons')) {
                this.initFilters();
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showError('Failed to load projects. Please try again later.');
        }
    }

    /**
     * Create project overlay for expanded view
     */
    createProjectOverlay() {
        // Check if overlay already exists
        if (document.querySelector('.project-overlay')) {
            return;
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'project-overlay';
        overlay.innerHTML = `
            <div class="project-expanded">
                <button class="project-expanded-close">&times;</button>
                <div class="project-expanded-gallery">
                    <img src="" alt="" class="project-expanded-image">
                    <div class="project-expanded-thumbnails"></div>
                </div>
                <div class="project-expanded-content">
                    <div class="project-expanded-header">
                        <h2 class="project-expanded-title"></h2>
                        <div class="project-expanded-meta"></div>
                        <div class="project-expanded-tags"></div>
                    </div>
                    <div class="project-expanded-description"></div>
                    <div class="project-expanded-details"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add close functionality
        const closeBtn = overlay.querySelector('.project-expanded-close');
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close on overlay click (but not on content click)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Add escape key functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /**
     * Load projects from the index
     */
    async loadProjects(projectFiles) {
        if (!this.projectsContainer) {
            console.error('Projects container not found');
            return;
        }
        
        // Clear existing projects
        this.projectsContainer.innerHTML = '';
        this.projects = [];
        
        // Load each project
        const projectPromises = projectFiles.map(filename => this.loadProject(filename));
        const loadedProjects = await Promise.all(projectPromises);
        
        // Sort projects by order property if it exists, otherwise use the order from index.json
        this.projects.sort((a, b) => {
            // If both have order property, sort by order
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            // If only one has order property, prioritize the one with order
            else if (a.order !== undefined) {
                return -1;
            }
            else if (b.order !== undefined) {
                return 1;
            }
            // Otherwise, maintain the order from index.json (already in this.projects array)
            return 0;
        });
        
        // Re-render projects in the sorted order
        this.projectsContainer.innerHTML = '';
        this.projects.forEach(project => this.renderProject(project));
    }

    /**
     * Load a single project
     */
    async loadProject(filename) {
        try {
            const response = await fetch(`${this.projectsPath}${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load project: ${response.status}`);
            }
            
            const project = await response.json();
            project.filename = filename; // Store filename for reference
            this.projects.push(project);
            this.renderProject(project);
        } catch (error) {
            console.error(`Error loading project ${filename}:`, error);
        }
    }

    /**
     * Render a project to the DOM
     */
    renderProject(project) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.projectId = project.filename;
        
        // Add special glow effect for the jahrei.me website project
        if (project.title === 'jahrei.me Portfolio Website') {
            projectCard.classList.add('featured-project');
        }
        
        // Add data tags for filtering (software page)
        if (project.tags && project.tags.length > 0) {
            projectCard.dataset.tags = project.tags.join(',');
        }
        
        // Create gallery HTML if images are provided
        let galleryHTML = '';
        if (project.gallery && project.gallery.length > 0) {
            galleryHTML = `
                <div class="project-gallery">
                    <div class="gallery-main">
                        <img src="${project.gallery[0]}" alt="${project.title}" class="gallery-main-image" onerror="this.onerror=null; this.src='/assets/placeholder.jpg';">
                    </div>
                    ${project.gallery.length > 1 ? `
                    <div class="gallery-thumbnails">
                        ${project.gallery.map((img, index) => `
                            <img src="${img}" alt="${project.title} ${index + 1}" 
                                class="gallery-thumbnail ${index === 0 ? 'active' : ''}" 
                                data-index="${index}" onerror="this.onerror=null; this.src='/assets/placeholder.jpg';">
                        `).join('')}
                    </div>` : ''}
                </div>
            `;
        } else {
            // Fallback to placeholder if no gallery
            galleryHTML = `
                <div class="project-image">
                    <span>${project.title} Image</span>
                </div>
            `;
        }
        
        // Build project meta section
        let metaHTML = '<div class="project-meta">';
        if (project.year) {
            metaHTML += `<span>${project.year}</span>`;
        }
        if (project.category) {
            metaHTML += `<span>${project.category}</span>`;
        }
        metaHTML += '</div>';
        
        // Build tags section
        let tagsHTML = '';
        if (project.tags && project.tags.length > 0) {
            tagsHTML = `
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            `;
        }
        
        // Build status badge if provided
        let statusHTML = '';
        if (project.status) {
            // Convert status to lowercase and replace spaces with hyphens for CSS class
            const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
            statusHTML = `<span class="project-status status-${statusClass}">${project.status}</span>`;
        }
        
        // Assemble the project card
        projectCard.innerHTML = `
            ${galleryHTML}
            <div class="project-content">
                <h3>${project.title}</h3>
                ${metaHTML}
                ${tagsHTML}
                ${statusHTML}
                <div class="project-description">
                    <p>${project.description}</p>
                </div>
            </div>
        `;
        
        this.projectsContainer.appendChild(projectCard);
    }

    /**
     * Initialize project card click functionality
     */
    initProjectCardClicks() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                const project = this.projects.find(p => p.filename === projectId);
                
                if (project) {
                    this.showExpandedProject(project);
                }
            });
        });
    }

    /**
     * Show expanded project view
     */
    showExpandedProject(project) {
        const overlay = document.querySelector('.project-overlay');
        if (!overlay) return;
        
        // Set current project
        this.currentExpandedProject = project;
        
        // Update content
        const title = overlay.querySelector('.project-expanded-title');
        const meta = overlay.querySelector('.project-expanded-meta');
        const tags = overlay.querySelector('.project-expanded-tags');
        const description = overlay.querySelector('.project-expanded-description');
        const details = overlay.querySelector('.project-expanded-details');
        
        title.textContent = project.title;
        
        // Update meta information
        meta.innerHTML = '';
        if (project.year) {
            const yearSpan = document.createElement('span');
            yearSpan.textContent = project.year;
            meta.appendChild(yearSpan);
        }
        if (project.category) {
            const categorySpan = document.createElement('span');
            categorySpan.textContent = project.category;
            meta.appendChild(categorySpan);
        }
        if (project.status) {
            const statusSpan = document.createElement('span');
            statusSpan.textContent = `Status: ${project.status}`;
            meta.appendChild(statusSpan);
        }
        
        // Update tags
        tags.innerHTML = '';
        if (project.tags && project.tags.length > 0) {
            project.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'project-expanded-tag';
                tagSpan.textContent = tag;
                tags.appendChild(tagSpan);
            });
        }
        
        // Update description
        description.innerHTML = `<p>${project.description}</p>`;
        
        // Update details
        details.innerHTML = project.details || '';
        
        // Update gallery
        this.updateExpandedGallery(project);
        
        // Show overlay
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Update expanded gallery
     */
    updateExpandedGallery(project) {
        const galleryContainer = document.querySelector('.project-expanded-gallery');
        const mainImage = galleryContainer.querySelector('.project-expanded-image');
        const thumbnailsContainer = galleryContainer.querySelector('.project-expanded-thumbnails');
        
        if (!project.gallery || project.gallery.length === 0) {
            mainImage.src = '';
            mainImage.alt = '';
            thumbnailsContainer.innerHTML = '';
            galleryContainer.style.display = 'none';
            return;
        }
        
        galleryContainer.style.display = 'block';
        
        // Set main image
        mainImage.src = project.gallery[0];
        mainImage.alt = project.title;
        
        // Handle image loading and dynamic resizing
        mainImage.onload = function() {
            // Calculate aspect ratio and adjust gallery width
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            
            // Determine optimal width based on aspect ratio
            let optimalWidth;
            if (aspectRatio > 2.0) {
                // Very wide image - moderate increase
                optimalWidth = Math.min(65, Math.max(45, aspectRatio * 25));
            } else if (aspectRatio > 1.3) {
                // Wide image - slight increase
                optimalWidth = Math.min(60, Math.max(45, aspectRatio * 30));
            } else if (aspectRatio < 0.6) {
                // Very tall image - give less space
                optimalWidth = Math.min(40, Math.max(30, aspectRatio * 65));
            } else if (aspectRatio < 0.8) {
                // Tall image - give less space
                optimalWidth = Math.min(45, Math.max(35, aspectRatio * 55));
            } else {
                // Square-ish image - balanced
                optimalWidth = Math.min(55, Math.max(40, aspectRatio * 45));
            }
            
            galleryContainer.style.flexBasis = `${optimalWidth}%`;
            galleryContainer.style.maxWidth = `${optimalWidth}%`;
        };
        
        // Handle image loading error
        mainImage.onerror = function() {
            // Replace with a placeholder or default image
            this.src = '/assets/placeholder.jpg';
            this.onerror = null; // Prevent infinite loop if placeholder also fails
            
            // Reset to default sizing on error
            galleryContainer.style.flexBasis = '50%';
            galleryContainer.style.maxWidth = '50%';
        };
        
        // Create thumbnails
        thumbnailsContainer.innerHTML = '';
        if (project.gallery.length > 1) {
            project.gallery.forEach((img, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = img;
                thumbnail.alt = `${project.title} ${index + 1}`;
                thumbnail.className = index === 0 ? 'project-expanded-thumbnail active' : 'project-expanded-thumbnail';
                thumbnail.dataset.index = index;
                
                // Handle thumbnail loading error
                thumbnail.onerror = function() {
                    // Replace with a placeholder or default image
                    this.src = '/assets/placeholder.jpg';
                    this.onerror = null; // Prevent infinite loop if placeholder also fails
                };
                
                thumbnail.addEventListener('click', () => {
                    // Update main image
                    mainImage.src = img;
                    
                    // Add dynamic resizing for this image too
                    mainImage.onload = function() {
                        const aspectRatio = this.naturalWidth / this.naturalHeight;
                        const galleryContainer = document.querySelector('.project-expanded-gallery');
                        
                        let optimalWidth;
                        if (aspectRatio > 2.0) {
                            optimalWidth = Math.min(65, Math.max(45, aspectRatio * 25));
                        } else if (aspectRatio > 1.3) {
                            optimalWidth = Math.min(60, Math.max(45, aspectRatio * 30));
                        } else if (aspectRatio < 0.6) {
                            optimalWidth = Math.min(40, Math.max(30, aspectRatio * 65));
                        } else if (aspectRatio < 0.8) {
                            optimalWidth = Math.min(45, Math.max(35, aspectRatio * 55));
                        } else {
                            optimalWidth = Math.min(55, Math.max(40, aspectRatio * 45));
                        }
                        
                        galleryContainer.style.flexBasis = `${optimalWidth}%`;
                        galleryContainer.style.maxWidth = `${optimalWidth}%`;
                    };
                    
                    // Update active thumbnail
                    thumbnailsContainer.querySelectorAll('.project-expanded-thumbnail').forEach(thumb => {
                        thumb.classList.remove('active');
                    });
                    thumbnail.classList.add('active');
                });
                
                thumbnailsContainer.appendChild(thumbnail);
            });
            
            // Show thumbnails
            thumbnailsContainer.style.display = 'flex';
        } else {
            // Hide thumbnails completely for single images
            thumbnailsContainer.style.display = 'none';
        }
        
        // Add lightbox functionality to main image
        mainImage.addEventListener('click', () => {
            this.openLightbox(project.gallery, 0);
        });
    }

    /**
     * Open lightbox for gallery
     */
    openLightbox(images, activeIndex) {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-image-container">
                    <img src="${images[activeIndex]}" class="lightbox-image" onerror="this.onerror=null; this.src='/assets/placeholder.jpg';">
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
        
        // Add event listeners
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Add keyboard navigation
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', handleKeyDown);
            } else if (e.key === 'ArrowLeft' && images.length > 1) {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight' && images.length > 1) {
                navigateImage(1);
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        // Add navigation for multiple images
        if (images.length > 1) {
            const prevBtn = lightbox.querySelector('.lightbox-prev');
            const nextBtn = lightbox.querySelector('.lightbox-next');
            let currentIndex = activeIndex;
            
            const navigateImage = (direction) => {
                currentIndex = (currentIndex + direction + images.length) % images.length;
                const lightboxImage = lightbox.querySelector('.lightbox-image');
                lightboxImage.src = images[currentIndex];
                lightboxImage.onerror = function() {
                    this.src = '/assets/placeholder.jpg';
                    this.onerror = null;
                };
                lightbox.querySelector('.current').textContent = currentIndex + 1;
            };
            
            prevBtn.addEventListener('click', () => navigateImage(-1));
            nextBtn.addEventListener('click', () => navigateImage(1));
        }
    }

    /**
     * Initialize filter functionality (for software page)
     */
    initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
                        if (tags.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    /**
     * Show error message
     */
    showError(message) {
        if (this.projectsContainer) {
            this.projectsContainer.innerHTML = `
                <div class="error-message">
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the category from the current page path
    const currentPath = window.location.pathname;
    let category = '';
    
    // For clean URLs, check if we're in a category directory
    if (currentPath.includes('/hardware/') || currentPath.endsWith('/hardware')) {
        category = 'hardware';
    } else if (currentPath.includes('/software/') || currentPath.endsWith('/software')) {
        category = 'software';
    } else if (currentPath.includes('/embedded/') || currentPath.endsWith('/embedded')) {
        category = 'embedded';
    }
    
    if (category) {
        const loader = new ProjectLoader(category);
        loader.init();
    }
});