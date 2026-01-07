/* setInterval Demo - Simple Countdown Timer
   This demo shows the basics of setInterval() and clearInterval().
   
   Key Concepts:
   - setInterval() takes two arguments: a function and a time interval (in milliseconds)
   - setInterval() returns an interval ID that can be stored for later use
   - clearInterval() stops the repeated execution using the interval ID
*/

let timeLeft = 10;  // Start at 10 seconds
let intervalId = null;

window.onload = init;

function init() {
    document.getElementById("startBtn").onclick = start;
    document.getElementById("stopBtn").onclick = stop;
    updateDisplay();
}

function start() {
    // Only start if not already running (intervalId will be null when stopped)
    if (intervalId === null) {
        // setInterval takes two arguments:
        // 1. The function to execute: countdown
        // 2. The time interval in milliseconds: 1000 (one second)
        intervalId = setInterval(countdown, 1000);
    }
}

function countdown() {
    timeLeft--;
    updateDisplay();
    
    // When countdown reaches zero, stop and reset
    if (timeLeft <= 0) {
        stop();
        alert("Time's up!");
        timeLeft = 10;  // Reset for next time
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById("display").textContent = timeLeft;
}

function stop() {
    // Use clearInterval to stop the repeated execution
    // clearInterval takes one argument: the interval ID returned by setInterval
    clearInterval(intervalId);
    intervalId = null;  // Set back to null so we know it's stopped
}
