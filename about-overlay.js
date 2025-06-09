// About Overlay Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create about overlay HTML structure
    const overlayHTML = `
        <div class="about-overlay">
            <div class="about-backdrop"></div>
            <div class="about-content">
                <button class="about-close" aria-label="Close about overlay"></button>
                <div class="signature-container">
                    <img src="assets/signature.png" alt="Jahrei's Signature" class="signature">
                </div>
                <div class="about-bio">
                    <p>I'm an electrical engineering student with a passion for bridging the gap between hardware and software. My work spans across web development, embedded systems, AI, automation, and creative design.</p>
                    <p>At Jahrei Labs, I focus on creating innovative solutions that combine technical expertise with practical applications. Whether it's custom hardware builds, software tools, or embedded systems, I'm driven by the challenge of turning ideas into reality.</p>
                </div>
                <div class="social-links-container">
                    <button class="social-links-toggle">Connect with me</button>
                    <div class="social-links">
                        <div class="social-grid">
                            <a href="https://github.com/jahrei" target="_blank" rel="noopener noreferrer" class="social-item">
                                <div class="social-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                </div>
                                <div class="social-name">GitHub</div>
                            </a>
                            <a href="https://linkedin.com/in/jahrei" target="_blank" rel="noopener noreferrer" class="social-item">
                                <div class="social-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </div>
                                <div class="social-name">LinkedIn</div>
                            </a>
                            <a href="https://twitter.com/jahrei_labs" target="_blank" rel="noopener noreferrer" class="social-item">
                                <div class="social-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                </div>
                                <div class="social-name">Twitter</div>
                            </a>
                            <a href="https://instagram.com/jahrei.labs" target="_blank" rel="noopener noreferrer" class="social-item">
                                <div class="social-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </div>
                                <div class="social-name">Instagram</div>
                            </a>
                            <a href="https://youtube.com/c/jahrei" target="_blank" rel="noopener noreferrer" class="social-item">
                                <div class="social-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                </div>
                                <div class="social-name">YouTube</div>
                            </a>
                            <a href="mailto:contact@jahreilabs.com" class="social-item">
                                <div class="social-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div class="social-name">Email</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Append overlay to body
    document.body.insertAdjacentHTML('beforeend', overlayHTML);
    
    // Get DOM elements
    const aboutOverlay = document.querySelector('.about-overlay');
    const aboutClose = document.querySelector('.about-close');
    const socialToggle = document.querySelector('.social-links-toggle');
    const socialLinks = document.querySelector('.social-links');
    
    // Create assets directory if it doesn't exist
    // Note: This would typically be done server-side
    
    // Add event listeners for about links in the navigation
    const aboutLinks = document.querySelectorAll('a[href="#about"]');
    aboutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if we're showing the overlay
            if (window.innerWidth >= 768) {
                e.preventDefault();
                aboutOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close overlay when clicking the close button
    aboutClose.addEventListener('click', function() {
        aboutOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close overlay when clicking outside the content
    aboutOverlay.addEventListener('click', function(e) {
        if (e.target === aboutOverlay || e.target.classList.contains('about-backdrop')) {
            aboutOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Toggle social links
    socialToggle.addEventListener('click', function() {
        socialToggle.classList.toggle('active');
        socialLinks.classList.toggle('active');
    });
    
    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aboutOverlay.classList.contains('active')) {
            aboutOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});