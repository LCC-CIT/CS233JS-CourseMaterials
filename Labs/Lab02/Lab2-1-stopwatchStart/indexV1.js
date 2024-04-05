/*  Overview
    This application simulates a simple stop watch on the page.  The user 
    can start, stop or reset the clock using the buttons and link on the page.

    There are 3 global variables that are used to keep track of the "state"
    of the application.
    -  isRunning - is a boolean that keeps track of whether the stopwatch is running or paused
    -  elapsedTime - is an integer that represents number of seconds that the stopwatch has been running
    -  timer - a reference to the code that fires at 1 second intervals that updates the clock

    There are 3 functions that are associated with the click event handler for the buttons
    and link on the page.  stopTimer, startTimer and resetTimer.

    There are 3 "helper" functions
    -   init is called when the page loads to set up the page
    -   incrementTimer is called at one second intervals to update the page
    -   pad is used to make sure that min or sec that are 1 digit can be displayed as 2
        digits by adding a leading zero
*/
/*
    Create 3 global variables, isRunning, timer and elapsedTime.
    Initialize them to false, null and 0 respectively.
*/
var isRunning = false;
var timer = null;
var elapsedTime = 0;

function init()
{
    var startButton = document.querySelector('#start');
    var stopButton = document.querySelector('#stop');
    var resetButton = document.querySelector('#reset');

    startButton.onclick = startTimer;
    stopButton.onclick = stopTimer;
    resetButton.onclick = resetTimer;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(incrementTimer, 1000);
    }
}

function incrementTimer() {
    var minutes = document.querySelector('#minutes');
    var seconds = document.querySelector('#seconds');

    elapsedTime++;
    var numOfMinutes = Math.floor(elapsedTime / 60);
    var numOfSeconds = elapsedTime % 60;

    minutes.innerHTML = pad(numOfMinutes);
    seconds.innerHTML = pad(numOfSeconds);
}

function pad(number) {
    return (number < 10) ? '0' + number : number;
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;

    var minutes = document.querySelector('#minutes');
    var seconds = document.querySelector('#seconds');
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
}

window.onload = init;
