/* CS233JS, Beginning JavaScipt Programming, Lane Community College *
 * Lab 1, Part 1: Exercise starter file by Brian Bird, spring 2026  *
 * For each of the exercise problems, complete the function.                 */
'use strict'

/* 
1. Check file upload—-a logical operation using OR 
(You won't really upload files, this is just code that checks a file's type.)

Complete the function named checkFileType to check file extensions for allowed upload types.
The parameter will hold a file extension (that's the part of the file name after the dot).
If the extension is either .doc, .docx, or .pdf, return "Accepted", otherwise return "Wrong type".
*/
function checkFileType(extension) {
   // TODO: check the file types and return "Accepted" or "Wrong type".
   return "";
}

// 2. Use a do while loop to count the number of characters in a sentence (including spaces and .).
function countChars(text) {
    let index = 0; // Beginning position of the string
    let char = ""; // The character at the current position
    // TODO: Write the code to complete the exercise.
    return index;
}

// 3. Use a while loop to count the number of words in a sentence.
function countWords(text) {
    let wordCount = 1; // There should always be at least one word
    // TODO: Write the code to complete the exercise.
    // Hint: How do we know where one word stops and the next word starts?
    return wordCount;
}

// 4. Use a for loop to raise a number to a power
function power(base, exponent) {
    let result = 1; // any number raised to the power of 0 will be 1
    // TODO: Write a loop that will multiply the base by iteslf the number of times specified by exponent.
    // Hint: Use this statement inside the loop: result = result * base 
    return result;
}

/* 5.  initialize an array with integer values 9, 7, 5, 4, 3, 2, 1
 then prints the index of the first occurrence of the value 3 using the `indexOf()` function.
*/
function findIndexOfThree() {
    const values = [9, 7, 5, 4, 3, 2, 1];
    // TODO: Use indexOf() to find and return the index of 3.
    return -1;
}

/* 6. Initialize a 2D array of integers: 
1, 2, 3, 4
1, 3, 5, 7
2, 4, 6, 8
return the sum of all the elements */
function sum2DArray() {
    const numbers = [
    ]; // TODO: Initialize this as a 2D array
    let total = 0;
    // TODO: Use loops to add all values in the 2D array, then return total.
    return total;
}

/* 7. Create an object literal that represents a car with these properties: 
make, Toyota; model, Prius year, 2003; color, white, and a method that returns a string describing the car. */
function describeCar() {
    const car = {
        // TODO: add the properties and method
    };
    return car.describe();
}

/* 8. Create an object literal that represents a student's class list and 
contains a property for each class they are taking. Add a method 
that uses a loop to return the average grade. You can add any number of classes, 
but the average grade should be 90.
*/
function averageClassGrade() {
    const classList = {
        // TODO: Add an array of objects with class name and grade properties
        // TODO: Add a method that returns the average grade
    };
    return classList.getAverageGrade();
}

/* 9. Using a button to get input.
Complete echoFavoriteDessert() so it gets the desert name from 
the input element and returns it.
*/
function echoFavoriteDesert() {
    const favoriteDessert = "";
    // TODO: Get the name of the desert from the input element on the web page
    return favoriteDessert;
}

function setFavoriteDesert() {
    const input = document.getElementById("favoriteDessertInput");
    const output = document.getElementById("favoriteDessertOutput");
    output.innerHTML = favoriteDesertText(input.value);
}

// 10. Validate a username. Write a regex pattern that will match a string containing 
// between 8 and 15 upper or lower case letters or numbers.
let pattern = /ToDo/;