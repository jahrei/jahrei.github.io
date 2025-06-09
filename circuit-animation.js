// Circuit Animation - Black on White using exact circuit.txt content
document.addEventListener('DOMContentLoaded', function() {
    // Create SVG element directly
    const svgContainer = document.createElement('div');
    svgContainer.id = 'circuit-svg-container';
    svgContainer.style.position = 'fixed';
    svgContainer.style.top = '0';
    svgContainer.style.left = '0';
    svgContainer.style.transform = 'translateX(-350px)';
    svgContainer.style.width = '100%';
    svgContainer.style.height = '100%';
    svgContainer.style.display = 'block';
    svgContainer.style.overflow = 'visible';
    svgContainer.style.zIndex = '-1';
    svgContainer.style.opacity = '0.4'; // Less transparent for better visibility
    svgContainer.style.pointerEvents = 'none';
    
    // Insert SVG container as the first child of the body
    document.body.insertBefore(svgContainer, document.body.firstChild);
    
    // Fetch the circuit.txt file
    fetch('circuit.txt')
        .then(response => response.text())
        .then(svgText => {
            // Modify the SVG content to use black color instead of blue gradient
            const modifiedSvgText = svgText
                // Keep the original viewBox but we'll use transform to shift it
                .replace('viewBox="350 20 600 500"', 'viewBox="350 20 600 500"')
                // Change width and height to make it bigger
                .replace('width="20" height="20"', 'width="150%" height="150%"')
                // Change the gradient colors to black/dark gray
                .replace('stop-color="#148BB1"', 'stop-color="#000000"')
                .replace('stop-color="#DBE2E8"', 'stop-color="#333333"')
                // Replace the gradient stroke with solid black
                .replace('stroke="url(#linear)"', 'stroke="#000000"')
                // Increase stroke width for better visibility
                .replace('stroke-width="4"', 'stroke-width="3"');
            
            // Insert the modified SVG content
            svgContainer.innerHTML = modifiedSvgText;
            
            // Initialize animation
            initAnimation();
        })
        .catch(error => {
            console.error('Error loading circuit SVG:', error);
            // Fallback if circuit.txt can't be loaded
            createFallbackCircuit();
        });
    
    // Create a fallback circuit if the file can't be loaded
    function createFallbackCircuit() {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="350 20 600 500" width="150%" height="150%">
            <g class="path" stroke="#000000" stroke-width="3" fill="none" fill-rule="evenodd" 
               stroke-linecap="round" stroke-linejoin="round" stroke-opacity="1" 
               stroke-dasharray="5,200,15,200,10,300" stroke-dashoffset="6400">
                <!-- Simple fallback circuit -->
                <path d="M100,100 L900,100" />
                <path d="M100,300 L900,300" />
                <path d="M100,500 L900,500" />
                <path d="M100,700 L900,700" />
                <path d="M100,900 L900,900" />
                <path d="M100,100 L100,900" />
                <path d="M300,100 L300,900" />
                <path d="M500,100 L500,900" />
                <path d="M700,100 L700,900" />
                <path d="M900,100 L900,900" />
            </g>
        </svg>`;
        
        initAnimation();
    }
    
    // Initialize animation with anime.js
    function initAnimation() {
        // Load anime.js if not already loaded
        if (typeof anime === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
            script.onload = startAnimation;
            document.head.appendChild(script);
        } else {
            startAnimation();
        }
    }
    
    // Start the animation
    function startAnimation() {
        // Animate all path elements
        anime({
            targets: '.path',
            strokeDashoffset: [6400, 0],
            easing: 'linear',
            duration: 20000,
            loop: true
        });
    }
});