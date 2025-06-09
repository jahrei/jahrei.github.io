
const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴァィゥェォャュョッー゠ヰヱヵヶヽヾ・ヮヵヶャュョッー・ヮヵヶャュョッー';
const latin = 'JETHERjetherJETHERjetherJETHERjetherJETHERjetherJETHERjether';
const nums = '010101010101010101010101010101';
const alphabet = katakana + latin + nums;
const fontSize = 26;
const columns = Math.floor(canvas.width / fontSize);

const rainDrops = [];
for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1; // Initialize with the same height for every column
}
let isPaused = false; // Variable to track whether the animation is paused
function drawRain() {
    if (!isPaused) { // Check if the animation is not paused
        context.fillStyle = 'rgba(0, 0, 0, 0.04)'; // Adjust the opacity here
        context.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas with slight opacity
        context.fillStyle = 'white'; // Color for raindrops
        context.font = `${fontSize}px Martian Mono, monospace`;

        for (let x = 0; x < columns; x++) {
            const charIndex = Math.floor(Math.random() * alphabet.length);
            const char = alphabet.charAt(charIndex);
            const xPos = x * fontSize;
            const yPos = rainDrops[x] * fontSize;

            context.fillText(char, xPos, yPos);

            // Update raindrop position
            if (Math.random() > 0.99) {
                rainDrops[x] = 0;
            }
            rainDrops[x]++;
        }
    }

    setTimeout(drawRain, 58); // Adjust the timeout value (milliseconds) to control the speed
}
// Function to pause the animation for a certain duration
function pauseAnimation(duration) {
    isPaused = true; // Set the pause flag to true
    setTimeout(() => {
        isPaused = false; // Resume the animation after the specified duration
        // Restart animation after pause duration
        drawRain();
    }, duration);
}



drawRain(); // Start the animation loop
pauseAnimation(1000);
