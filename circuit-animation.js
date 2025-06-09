// Circuit Animation for Hardware Page
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'circuit-canvas';
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
    
    // Circuit node class
    class Node {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.connections = [];
            this.size = Math.random() * 2 + 1;
        }
        
        connect(node) {
            this.connections.push(node);
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#000';
            ctx.fill();
            
            // Draw connections
            for (const node of this.connections) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(node.x, node.y);
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    
    // Create circuit grid
    const gridSpacing = 50;
    const nodes = [];
    const nodeChance = 0.3; // Probability of creating a node at a grid point
    
    function createGrid() {
        nodes.length = 0; // Clear existing nodes
        
        // Create nodes at grid points with some randomness
        for (let x = 0; x < canvas.width; x += gridSpacing) {
            for (let y = 0; y < canvas.height; y += gridSpacing) {
                if (Math.random() < nodeChance) {
                    // Add some randomness to position
                    const offsetX = (Math.random() - 0.5) * gridSpacing * 0.5;
                    const offsetY = (Math.random() - 0.5) * gridSpacing * 0.5;
                    nodes.push(new Node(x + offsetX, y + offsetY));
                }
            }
        }
        
        // Connect nodes (only to nearby nodes)
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            for (let j = 0; j < nodes.length; j++) {
                if (i !== j) {
                    const otherNode = nodes[j];
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + 
                        Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    // Connect if within range and with some randomness
                    if (distance < gridSpacing * 1.5 && Math.random() < 0.3) {
                        node.connect(otherNode);
                    }
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw all nodes and connections
        for (const node of nodes) {
            node.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    createGrid();
    animate();
    
    // Regenerate grid occasionally for some dynamism
    setInterval(createGrid, 30000); // Every 30 seconds
    
    // Regenerate on resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createGrid();
    });
});