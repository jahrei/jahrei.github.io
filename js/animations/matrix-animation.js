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
    canvas.style.opacity = '0.3'; // More visible
    canvas.style.pointerEvents = 'none'; // Don't interfere with clicks
    
    // Get canvas context
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters - using the same as the original
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴァィゥェォャュョッー゠ヰヱヵヶヽヾ・ヮヵヶャュョッー・ヮヵヶャュョッー';
    const latin = 'JETHERjetherJETHERjetherJETHERjetherJETHERjetherJETHERjether';
    const nums = '010101010101010101010101010101';
    const alphabet = katakana + latin + nums;
    const fontSize = 14; // Smaller font size for more density
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize raindrops
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    // Animation state
    let isPaused = false;
    
    // Draw the matrix rain
    function drawRain() {
        if (!isPaused) {
            // Use a semi-transparent white to create a fading trail effect
            // Lower opacity (0.1) means longer trails
            context.fillStyle = 'rgba(255, 255, 255, 0.1)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Use black for the matrix characters
            context.fillStyle = '#000000';
            context.font = `${fontSize}px monospace`;
            
            for (let x = 0; x < columns; x++) {
                const charIndex = Math.floor(Math.random() * alphabet.length);
                const char = alphabet.charAt(charIndex);
                const xPos = x * fontSize;
                const yPos = rainDrops[x] * fontSize;
                
                // Make the first character in each column (the "head") brighter
                if (rainDrops[x] === 1 || rainDrops[x] === 2) {
                    // Head of the rain drop - fully opaque
                    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
                } else {
                    // Trail characters - varying opacity
                    const opacity = Math.random() * 0.5 + 0.3; // Between 0.3 and 0.8
                    context.fillStyle = `rgba(0, 0, 0, ${opacity})`;
                }
                
                context.fillText(char, xPos, yPos);
                
                // Reset raindrop or move it down
                if (yPos > canvas.height && Math.random() > 0.975) {
                    rainDrops[x] = 0;
                }
                rainDrops[x]++;
            }
        }
        
        // Add a slight delay between frames to slow down the animation
        setTimeout(() => {
            requestAnimationFrame(drawRain);
        }, 50); // 50ms delay
    }
    
    // Function to pause the animation
    function pauseAnimation(duration) {
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
        }, duration);
    }
    
    // Start the animation
    drawRain();
    pauseAnimation(1000); // Initial pause
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        // Recalculate columns
        const newColumns = Math.floor(canvas.width / fontSize);
        
        // Adjust raindrops array if needed
        if (newColumns > columns) {
            for (let x = columns; x < newColumns; x++) {
                rainDrops[x] = 1;
            }
        }
    });
});