// Initialze the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the width and height of the canvas
canvas.width = 800;
canvas.height = 600;

const image = new Image();

// load the image into the canvas
function drawImage() {
    image.src = 'images/_22e83dcf-8dfc-4a4e-bd89-101634f4ebca.jpeg';
    image.onload = function () {
        ctx.drawImage(image, 100, 0, 600, canvas.height);
    };
}

// Add a filer
// percent is a number
function addFilter(percent) {
    ctx.filter = `sepia(${percent})`;
}

function makeCircularImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(400, 300, 300, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
    ctx.clip();
    ctx.drawImage(image, 0, 0, 800, 600); // Image will appear inside the circle
}

let isDrawing = false;

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.strokeStyle = 'white'
        ctx.stroke();
    }
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
});

drawImage();
addFilter(0);