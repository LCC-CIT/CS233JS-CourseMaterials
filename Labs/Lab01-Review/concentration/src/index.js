/*  Overview
    This application simulates a concentration or memory game of 20 cards.
    The game begins with 20 (10 pairs of 2) cards "face down" on the board.
    The user clicks 2 cards at a time.  The cards are displayed "face up".
    After a brief pause the cards are removed from the board if they match
    or are turned "face down" if they are not.  The game is over when the 
    user has cleared all 20 cards from the board.
*/

// The folder where your card images are stored
const IMAGE_PATH = 'Cards/';
// An array that stores the images for each card
const NUMBER_OF_CARDS = 20;
const images = Array(NUMBER_OF_CARDS).fill(null);
// The index of the first card picked by the user
let firstPick = -1;
// The index of the second card picked by the user
let secondPick = -1;
// Statistics about this "round"
let matches = 0;
let tries = 0;

// Initializes the page after it's loaded.
function init()
{
    // fill the array of images by calling fillImages
    fillImages();
    // shuffle them by calling shuffle images
    shuffleImages();
    // show the number of matches on the page by calling showMatches
    showMatches();
    // enable all of the card elements on the page by calling enableAllCards
    enableAllCards();
    // show the backs of all of the cards by calling showAllBacks
    showAllBacks();
}

// shows the number of matches and tries in the status element on the page
function showMatches() {
    // update the element on the page to display the variable matches and tries
    document.getElementById("status").innerHTML = "Matches: " + matches + " Tries: " + tries;
}

// fills the array images with 10 pairs of card filenames
// card filenames follow this pattern:  cardvs.jpg where
// v is the first char of the value of the card and 
// s is the first char of the suit of the card
// example:  cardjh.jpg is the jack of hearts
function fillImages() {
    const values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    const suits = ['h', 's'];
    // create a variable called index and set it to 0
    let imageIndex = 0;
    // create a for loop that iterates through each value in the values array
    for(const value of values) {
        // create a for loop that iterates through each suit in the suits array
        for (const suit of suits) {
            // set the element in the images array at index to a string that contains card + value + suit + .jpg
            images[imageIndex] = "card" + value + suit + ".jpg";
            // increment the index
            imageIndex++;
        // end for loop for the suits
        }
    // end for loop for the values
    }
}

// Shuffles the elements in the images array
function shuffleImages() {
    // Iterate through the images array swapping each card with another randomly selected card
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
        // set rndIndex to a random number between 0 and 19
        let rndIndex = Math.trunc(Math.random() * (NUMBER_OF_CARDS - 1));
        // set a variable called temp to the current image from the array
        let temp = images[i];
        // set current image from the array to the element in images at the rndIndex
        images[i] = images[rndIndex];
        // set the element at the rndIndex to temp
        images[rndIndex] = temp;
    }   
    // end for loop
}

// Assigns the handleclick function to the onclick event for all cards
// on the page.  (All cards have the name attribute 'card'.)
// Sets the cursor (part of the style) to 'pointer'
function enableAllCards() {
    let cards = document.getElementsByName("card");
    for (const card of cards) {
        card.onclick = handleClick;
        card.style.cursor = "pointer";
    }
    // end for loop
}

// Enables only the cards whose backgroundImage style property is not 'none'
function enableAllRemainingCards() {
    let cards = document.getElementsByName("card");
   for (let i = 0; i < cards.length; i++) {
        if (cards[i].style.backgroundImage != 'none') {
            cards[i].onclick = handleClick;
            cards[i].style.cursor = 'pointer';
        }
    }
    // end for loop
}

// Shows the back of one card based on it's index
// each card has an id attribute set to it's index in the html page
// the backgroundImage (style) is set to the url of the image
// for a card back to "show the back"
function showBack(index) {
    let card = document.getElementById(index);
    card.style.backgroundImage = "url(" + IMAGE_PATH + "black_back.jpg)";
}

// Shows the back for all cards
function showAllBacks() {
    for (let i = 0; i < NUMBER_OF_CARDS; i++)
        showBack(i);
    // end for loop
}

// This function is called when the user clicks on a card.
// It causes the card face to be shown and if it's the seocn
// card clicked, checks for a match.
function handleClick() {
    let index = this.id;
    this.style.backgroundImage = 'url(' + IMAGE_PATH + images[index] + ')';
    disableCard(index);
    if (firstPick == -1) {
        firstPick = index;
    }
    else {
        secondPick = index;
        disableAllCards();
        setTimeout(checkCards, 2000);
    }
}

// Disable one card based on it's index.
function disableCard(index) {
    let card = document.getElementById(index);
    card.onclick = () => {}; 
    card.style.cursor = 'none';
}

// Disable all of the cards.
function disableAllCards() {

}

// Checks the 2 cards that have been picked for matches.
function checkCards() {
    tries++;
    if (isMatch() == true) {
        matches++;
        removeCard(firstPick);
        removeCard(secondPick);
        if (matches < 10) {
            enableAllRemainingCards();
        }
    }
    else {
        showBack(firstPick);
        showBack(secondPick);
        enableAllRemainingCards();
    }
    showMatches();
    firstPick = -1;
    secondPick = -1;
}

// Determines if the images in firstPick and secondPick are matches
// 2 cards are a match if they have the same value
// cardvs.jpg is the pattern for card file names
function isMatch() {
    if (images[firstPick].substr(4, 1) == images[secondPick].substr(4, 1))
        return true;
    else
        return false;
}

// Removes one card from the board based by it's index.
// Sets the backgroundImage to 'none' to remove the card.
function removeCard(index) {
    var card = document.getElementById(index);
    card.style.backgroundImage = 'none';
}

window.onload = init;

