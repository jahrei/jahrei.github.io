// Matrix Animation for Software Page (Fixed Version)
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
    canvas.style.opacity = '0.25'; // Adjusted opacity
    canvas.style.pointerEvents = 'none'; // Don't interfere with clicks
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Initialize with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize raindrops array
    const rainDrops = Array(columns).fill(1);
    
    // Draw matrix rain
    function draw() {
        // Semi-transparent white to create fading effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Black text
        ctx.fillStyle = '#000';
        ctx.font = fontSize + 'px monospace';
        
        // Draw each raindrop
        for (let i = 0; i < rainDrops.length; i++) {
            // Random character
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            
            // Make the head of the drop darker
            if (rainDrops[i] <= 2) {
                ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Fully opaque for head
            } else {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; // Slightly transparent for trail
            }
            
            // Draw the character
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            // Reset drop to top when it reaches bottom
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            
            // Move drop down
            rainDrops[i]++;
        }
    }
    
    // Animation loop with delay
    function animate() {
        draw();
        setTimeout(() => requestAnimationFrame(animate), 50);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        // Adjust raindrops array for new width
        const newColumns = Math.floor(canvas.width / fontSize);
        if (newColumns > rainDrops.length) {
            rainDrops.push(...Array(newColumns - rainDrops.length).fill(1));
        } else {
            rainDrops.length = newColumns;
        }
    });
});