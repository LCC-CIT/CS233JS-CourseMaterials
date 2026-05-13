// Initialze the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the width and height of the canvas
canvas.width = 800;
canvas.height = 600;

// load the image into the canvas
function drawImage() {
    const image = new Image();
    image.src = 'images/_22e83dcf-8dfc-4a4e-bd89-101634f4ebca.jpeg';
    image.onload = function () {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
}

// Add a 
function addFilter() {
    ctx.filter = 'sepia(100%)';
}

drawImage();
addFilter();