/* CS233JS, Beginning JavaScript Programming, Lane Community College *
 * Lab 2, Part 1: Exercise starter file by Brian Bird, spring 2026  *
 * For each of the exercise problems, complete the function.         */
'use strict'

/*
1. Arrow function with an implicit return.
Complete the arrow function named tripleNumber so it returns a number multiplied by 3.
*/
const tripleNumber = number => 0

/*
2. Arrow function that returns a boolean.
Complete isLongWord so it returns true when a word has more than 6 letters.
Hint: use the .length property to get the length of a string.
*/
const isLongWord = word => false

/*
3. Arrow function with a default parameter.
Complete calculateDiscountedPrice so it returns the sale price after subtracting a discount.
If no discount rate is provided, use 0.1 for a 10% discount.
*/
const calculateDiscountedPrice = (price, discountRate = 0.1) => {
    // TODO: Return the discounted price.
    return 0;
}

/*
4. Arrow function with a default parameter and a template string.
Complete the arrow function named welcomeGuest.
If a name is provided, return "Welcome, NAME!".
If no name is provided, use "Guest".
*/
const welcomeGuest = (name = "Guest") => {
    // TODO: Return a welcome message with a template string.
    return "";
}

/*
5. Array destructuring.
Complete getSecondPlanet so it uses destructuring to return the second item in the array.
Example array argument: ["Mercury", "Venus", "Earth", "Mars"]
*/
function getSecondPlanet(planets) {
    // TODO: Use array destructuring and return the second planet.
    return "";
}

/*
6. Object destructuring with a template string.
Complete formatMovie so it extracts title and director from the object
and returns "TITLE directed by DIRECTOR".
Example object argument: { title: "Hidden Figures", director: "Theodore Melfi" }
*/
function formatMovie(movie) {
    // TODO: Use object destructuring and return the formatted string.
    return "";
}

/*
7. Nested destructuring.
Complete totalScores so it destructures the scores array from the object
and returns the sum of the three quiz scores.
Example object with array parameter: { name: "Ari", scores: [8, 9, 10] }
*/
function totalScores(student) {
    // TODO: Use destructuring to get the quiz scores and return their total.
    return 0;
}

/*
8. Spread operator with arrays.
Complete combinedScoreTotal so it combines two arrays of scores with the spread operator
and returns the total of all the numbers.
Example array arguments: [12, 15, 10], [8, 9]
*/
function combinedScoreTotal(homeScores, awayScores) {
    // TODO: Use the spread operator to combine the arrays, then total the scores.
    return 0;
}

/*
9. Spread operator with a default parameter.
Complete addSupply so it uses the spread operator to return a new array
with an extra supply added to the end.
If no extra supply is provided, add "pencil".
Return the new array as a comma-separated string.
Example arguments: ["notebook", "eraser"], "marker"
*/
function addSupply(supplies, extraSupply = "pencil") {
    // TODO: Use the spread operator and return the updated list as a string.
    return "";
}

/*
10. Spread operator with objects and a template string.
Complete shipOrder so it uses the spread operator to create a new object
with the status changed to "shipped", then return "ITEM is shipped".
Exmaple object argument: { item: "Backpack", status: "processing" }
*/
function shipOrder(order) {
    // TODO: Use the spread operator to copy the object and update the status.
    return "";
}