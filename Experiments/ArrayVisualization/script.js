// Get the canvas element
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Define an array of elements (you can modify this as needed)
const myArray = [10, 20, 30, 40, 50];

// Set canvas dimensions
canvas.width = 200; // pixels
canvas.height = 300; 

// Function to draw the array elements
function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set properties for drawing (e.g., font, color)
    ctx.font = '16px Arial';
    ctx.fillStyle = 'blue';

    // Calculate spacing between elements
    const elementWidth = 50;
    const spacing = 10;

    // Draw each element in the array
    myArray.forEach((element, index) => {
        const x = index * (elementWidth + spacing);
        const y = canvas.height / 2; // Center vertically

        // Draw a rectangle for each element
        ctx.fillRect(x, y, elementWidth, 30);

        // Display the element value
        ctx.fillStyle = 'white';
        ctx.fillText(element.toString(), x + 10, y + 20);
        ctx.fillStyle = 'blue';
    });
}

// Call the drawArray function initially
drawArray();

// Example: Update the array and redraw (you can add animation logic here)
myArray[2] = 35;
drawArray();

// Function to add a value to the array
function addValue() {
    const inputValue = document.getElementById('valueInput').value;
    if (inputValue.trim() !== '') {
        myArray.push(inputValue);
        console.log('Added:', inputValue);
        // You can also update the visualization here if needed
    } else {
        console.log('Please enter a valid value.');
    }
}