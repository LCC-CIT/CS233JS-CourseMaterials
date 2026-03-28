/* CS233JS, Beginning JavaScipt Programming, Lane Community College *
 * Lab 1, Part 1: Exercise starter file by Brian Bird, spring 2026  *
 * For each of the problems, complete the function.                 */
'use strict'

/* 
1. Check file upload—-a logical operation using OR 
(You won't really upload files, this is just code that checks a file's type.)

Complete the function named checkFileType to check file extensions for allowed upload types.
The parameter will hold a file extension (that's the part of the file name after the dot).
If the extension is either .doc, .docx, or .pdf, return "Accepted", otherwise return "Wrong type".
*/
function checkFileType(extension) {
    if (extension === ".doc" || extension === ".docx" || extension === ".pdf") {
        return "Accepted";
    } else {
        return "Wrong type";
    }
}

// 2. Use a do while loop to count the number of characters in a sentence (including spaces and .).
function countChars(text) {
    let index = 0; // Beginning position of the string
    let char = ""; // The character at the current position
    do {
        char = text.charAt(index);
        if (char !== "") {
            index++;
        }
    } while (char !== "");

    return index;
}

// 3. Use a while loop to count the number of words in a sentence.
function countWords(text) {
    if (text.trim() === "") {
        return 0;
    }

    let wordCount = 1; // There should always be at least one word
    let index = 0;

    while (index < text.length) {
        if (text.charAt(index) === " ") {
            wordCount++;
        }
        index++;
    }

    return wordCount;
}

// 4. Use a for loop to raise a number to a power
function power(base, exponent) {
    let result = 1; // any number raised to the power of 0 will be 1
    for (let count = 0; count < exponent; count++) {
        result = result * base;
    }

    return result;
}

/* 5.  initialize an array with integer values 9, 7, 5, 4, 3, 2, 1
 then prints the index of the first occurrence of the value 3 using the `indexOf()` function.
*/
function findIndexOfThree() {
    const values = [9, 7, 5, 4, 3, 2, 1];
    return values.indexOf(3);
}

/* 6. Initialize a 2D array of integers: 
1, 2, 3, 4
1, 3, 5 7
2, 4, 6, 8
return the sum of all the elements */
function sum2DArray() {
    const numbers = [
        [1, 2, 3, 4],
        [1, 3, 5, 7],
        [2, 4, 6, 8]
    ];
    let total = 0;

    for (let row = 0; row < numbers.length; row++) {
        for (let column = 0; column < numbers[row].length; column++) {
            total += numbers[row][column];
        }
    }

    return total;
}

/* 7. Create an object literal that represents a car with these properties: 
make, Toyota; model, Prius year, 2003; color, white, and a method that returns a string describing the car. */
function describeCar() {
    const car = {
        make: "Toyota",
        model: "Prius",
        year: 2003,
        color: "white",
        describe: function () {
            return this.year + " " + this.color + " " + this.make + " " + this.model;
        }
    };
    return car.describe();
}

/* 8. Create an object literal that represents a student's class list and contains a property for each class they are taking. 
Add a method that uses a loop to return the average grade.
*/
function averageClassGrade() {
    const classList = {
        classes: [
            { name: "CS133JS", grade: 90 },
            { name: "WR121", grade: 85 },
            { name: "MTH111", grade: 95 }
        ],
        getAverageGrade: function () {
            let total = 0;
            for (let index = 0; index < this.classes.length; index++) {
                total += this.classes[index].grade;
            }
            return total / this.classes.length;
        }
    };
    return classList.getAverageGrade();
}

/* 9. Using a button to get input.
Complete echoFavoriteDessert() so it gets the desert name from 
the input element with id "favoriteDessertInput" and returns it.
*/
function echoFavoriteDessert() {
    const inputElement = document.getElementById("favoriteDessertInput");
    return inputElement.value;
}

// 10. Validate a username. Write a regex pattern that will match a string containing 
// between 8 and 15 upper or lower case letters or numbers.
let pattern = /^[A-Za-z0-9]{8,15}$/;