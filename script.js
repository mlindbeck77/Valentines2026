// Get all pages
const pages = document.querySelectorAll('.page');
let currentPage = 0;

// Function to show a specific page
function showPage(pageIndex) {
    pages.forEach((page, index) => {
        page.style.display = index === pageIndex ? 'flex' : 'none';
    });
}

// Initialize - show only first page
showPage(0);

// Open button (page 0 -> page 1)
document.getElementById('openButton').addEventListener('click', () => {
    currentPage = 1;
    showPage(currentPage);
});

// All "next" buttons
document.querySelectorAll('.next-button').forEach((button, index) => {
    button.addEventListener('click', () => {
        currentPage++;
        showPage(currentPage);
    });
});

// Yes button (page 8 -> page 9)
document.getElementById('yesButton').addEventListener('click', () => {
    currentPage = 9;
    showPage(currentPage);
    startConfetti(); // Optional: trigger confetti animation
});

// No button - make it move away when clicked (fun interaction!)
const noButton = document.getElementById('noButton');
noButton.addEventListener('click', () => {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    noButton.style.position = 'absolute';
    noButton.style.left = x + 'px';
    noButton.style.top = y + 'px';
});
// Confetti Animation with Hearts
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ffb6c1', '#ff1493', '#c71585', '#ff0066', '#ff3399'];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 15 + 10;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            // Draw heart shape
            ctx.beginPath();
            const topCurveHeight = this.size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            // Top left curve
            ctx.bezierCurveTo(
                0, 0,
                -this.size / 2, 0,
                -this.size / 2, topCurveHeight
            );
            // Bottom left curve
            ctx.bezierCurveTo(
                -this.size / 2, (this.size + topCurveHeight) / 2,
                0, (this.size + topCurveHeight) / 1.3,
                0, this.size
            );
            // Bottom right curve
            ctx.bezierCurveTo(
                0, (this.size + topCurveHeight) / 1.3,
                this.size / 2, (this.size + topCurveHeight) / 2,
                this.size / 2, topCurveHeight
            );
            // Top right curve
            ctx.bezierCurveTo(
                this.size / 2, 0,
                0, 0,
                0, topCurveHeight
            );
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new Confetti());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}