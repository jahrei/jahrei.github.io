// Circuit Animation for Hardware Page using SVG path data from circuit.txt
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
    canvas.style.opacity = '0.15'; // Slightly more visible
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
    
    // Circuit paths data from circuit.txt
    const circuitPaths = [];
    
    // Function to fetch and parse the circuit.txt file
    async function fetchCircuitData() {
        try {
            const response = await fetch('circuit.txt');
            const text = await response.text();
            parseCircuitData(text);
            startAnimation();
        } catch (error) {
            console.error('Error loading circuit data:', error);
            // Fallback to simple animation if circuit data can't be loaded
            createSimpleCircuit();
            startAnimation();
        }
    }
    
    // Parse SVG path data from the circuit.txt content
    function parseCircuitData(svgText) {
        // Extract polyline elements
        const polylineRegex = /<polyline[^>]*points="([^"]*)"[^>]*>/g;
        let match;
        
        // Extract polyline points
        while ((match = polylineRegex.exec(svgText)) !== null) {
            const pointsStr = match[1];
            const points = pointsStr.split(' ')
                .filter(p => p.trim() !== '')
                .map(p => {
                    const [x, y] = p.split(',').length > 1 ? p.split(',') : p.split(' ');
                    return { x: parseFloat(x), y: parseFloat(y) };
                });
            
            if (points.length >= 2) {
                circuitPaths.push({
                    type: 'polyline',
                    points: points
                });
            }
        }
        
        // Extract path elements
        const pathRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
        
        // Extract path data
        while ((match = pathRegex.exec(svgText)) !== null) {
            const pathData = match[1];
            const points = parseSVGPath(pathData);
            
            if (points.length >= 2) {
                circuitPaths.push({
                    type: 'path',
                    points: points
                });
            }
        }
        
        if (circuitPaths.length === 0) {
            console.warn("No paths found in SVG data. Check if circuit.txt contains valid SVG path data.");
            createSimpleCircuit();
        } else {
            console.log(`Parsed ${circuitPaths.length} circuit paths from SVG data`);
        }
    }
    
    // Parse SVG path data (M, L commands)
    function parseSVGPath(pathData) {
        const points = [];
        const commands = pathData.match(/[ML][^ML]*/g) || [];
        
        commands.forEach(cmd => {
            const type = cmd[0]; // M or L
            const coords = cmd.substring(1).trim().split(' ');
            
            if (coords.length >= 2) {
                const x = parseFloat(coords[0]);
                const y = parseFloat(coords[1]);
                points.push({ x, y });
            }
        });
        
        return points;
    }
    
    // Create a simple circuit if the SVG data can't be loaded
    function createSimpleCircuit() {
        // Create some basic lines as a fallback
        for (let i = 0; i < 20; i++) {
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height;
            const points = [
                { x: startX, y: startY },
                { x: startX + Math.random() * 100 - 50, y: startY + Math.random() * 100 - 50 },
                { x: startX + Math.random() * 200 - 100, y: startY + Math.random() * 200 - 100 }
            ];
            
            circuitPaths.push({
                type: 'polyline',
                points: points
            });
        }
    }
    
    // Animation variables
    let animationProgress = 0;
    const animationSpeed = 0.3; // Slightly faster animation
    
    // Draw a single path with animation
    function drawPath(path, progress) {
        if (!path || !path.points || path.points.length < 2) return;
        
        const points = path.points;
        const totalLength = calculatePathLength(points);
        const drawLength = totalLength * progress;
        
        let currentLength = 0;
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            const segmentLength = distance(points[i-1], points[i]);
            
            if (currentLength + segmentLength <= drawLength) {
                // Draw the full segment
                ctx.lineTo(points[i].x, points[i].y);
                currentLength += segmentLength;
            } else if (currentLength < drawLength) {
                // Draw partial segment
                const remainingLength = drawLength - currentLength;
                const ratio = remainingLength / segmentLength;
                const partialX = points[i-1].x + (points[i].x - points[i-1].x) * ratio;
                const partialY = points[i-1].y + (points[i].y - points[i-1].y) * ratio;
                ctx.lineTo(partialX, partialY);
                break;
            } else {
                break;
            }
        }
        
        // Use a blue gradient color similar to the original SVG
        ctx.strokeStyle = '#148BB1';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
    
    // Calculate the total length of a path
    function calculatePathLength(points) {
        let length = 0;
        for (let i = 1; i < points.length; i++) {
            length += distance(points[i-1], points[i]);
        }
        return length;
    }
    
    // Calculate distance between two points
    function distance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    
    // Scale and position the circuit paths to fit the canvas
    function scaleAndPositionPaths() {
        if (circuitPaths.length === 0) return;
        
        // Find the bounds of all paths
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        circuitPaths.forEach(path => {
            path.points.forEach(point => {
                minX = Math.min(minX, point.x);
                minY = Math.min(minY, point.y);
                maxX = Math.max(maxX, point.x);
                maxY = Math.max(maxY, point.y);
            });
        });
        
        const pathWidth = maxX - minX;
        const pathHeight = maxY - minY;
        
        // Calculate scale to fit the canvas while maintaining aspect ratio
        const scaleX = canvas.width / pathWidth * 0.8;
        const scaleY = canvas.height / pathHeight * 0.8;
        const scale = Math.min(scaleX, scaleY);
        
        // Calculate offset to center the paths
        const offsetX = (canvas.width - pathWidth * scale) / 2 - minX * scale;
        const offsetY = (canvas.height - pathHeight * scale) / 2 - minY * scale;
        
        // Apply scale and offset to all points
        circuitPaths.forEach(path => {
            path.points.forEach(point => {
                point.x = point.x * scale + offsetX;
                point.y = point.y * scale + offsetY;
            });
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw all paths with current animation progress
        circuitPaths.forEach(path => {
            drawPath(path, animationProgress);
        });
        
        // Update animation progress
        animationProgress += animationSpeed / 100;
        if (animationProgress > 1) {
            animationProgress = 0;
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    function startAnimation() {
        scaleAndPositionPaths();
        animate();
    }
    
    // Initialize by fetching circuit data
    fetchCircuitData();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        scaleAndPositionPaths();
    });
});