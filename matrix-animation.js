// Matrix Animation for Software Page
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.classList.add('background-animation');
    
    // Insert canvas as the first child of the body
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Set canvas styles
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05'; // Very subtle
    canvas.style.pointerEvents = 'none'; // Don't interfere with clicks
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix rain configuration
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    const rainDrops = [];
    
    // Initialize rain drops
    function initRainDrops() {
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
    }
    
    initRainDrops();
    
    // Draw matrix rain
    function drawMatrix() {
        // Semi-transparent black to show trail
        ctx.fillStyle = 'rgba(255, 255, 255, 0.97)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set color for characters
        ctx.fillStyle = '#000';
        ctx.font = fontSize + 'px monospace';
        
        // Loop over drops
        for (let i = 0; i < rainDrops.length; i++) {
            // Choose a random character
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            
            // x = i * fontSize, y = value of rainDrops[i] * fontSize
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            // Randomly reset drop to top after it has crossed the screen
            // Adding randomness to the reset to make the drops scattered
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            
            // Increment y coordinate
            rainDrops[i]++;
        }
    }
    
    // Animation loop
    function animate() {
        drawMatrix();
        setTimeout(() => requestAnimationFrame(animate), 50);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        initRainDrops();
    });
});