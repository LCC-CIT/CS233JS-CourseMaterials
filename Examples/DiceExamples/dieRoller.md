# How the Die Roller App Works

The JavaScript code in this app is responsible for simulating the roll of a six-sided die and updating the webpage with the result. The way the functions in this app work is explained below.

## rollDie

The `rollDie` function is the main function in this script. It is simulates rolling a six-sided die and updating the webpage with the result.

```javascript
function rollDie() {
            let dieRoll = randomSix();
            let resultDiv = document.getElementById('result')
            resultDiv.textContent = dieRoll;
            getDieImage(dieRoll);
        }
```

Here's how it works:

1. `let dieRoll = randomSix();` - This line calls the `randomSix` function which generates a random number between 1 and 6 and assigns the returned value to the variable `dieRoll`.
2. `let resultDiv = document.getElementById('result')` - This line gets a reference to the HTML element with the id 'result' where the number stored in `dieRoll` will be shown.
3. `resultDiv.textContent = dieRoll;` - This line updates the text content of the 'result' HTML element to display the result of the die roll.
4. `getDieImage(dieRoll);` - This line calls the `getDieImage` function which updates an image on the webpage to reflect the result of the die roll

## randomSix

The `randomSix` function generates a random integer between 1 and 6, which will be used to simulate rolling a six-sided die.

```javascript
function randomSix() {
   let littleNumber = Math.random();
   let biggerNumber = littleNumber * 6 + 1;
   let integerNumber = Math.floor(biggerNumber);
   return integerNumber;
}
```

Here's how it works:

1. `let littleNumber = Math.random();` - This line generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
2. `let biggerNumber = littleNumber * 6 + 1;` - This line scales the random number to a range between 1 (inclusive) and 7 (exclusive). This is done by multiplying the original random number by 6 (changing the range to 0-6) and then adding 1 (shifting the range to 1-7).
3. `let integerNumber = Math.floor(biggerNumber);` - This line rounds down the scaled random number to the nearest whole number, resulting in an integer between 1 and 6 (inclusive).
4. `return integerNumber;` - This line returns the generated integer.

## getDieImage

The `getDieImage` function updates the source of an image element on the webpage to reflect the result of a die roll. 

```javascript
function getDieImage(side)
        {
            let imagePath= "images/die" + side + ".png";
            let imgElement = document.getElementById('dieImage');
            imgElement.src = imagePath;
        }
```

Here's how it works:

1. `let imagePath= "images/die" + side + ".png";` - This line constructs a string representing the path to the image file corresponding to the rolled die side. It assumes that there are six image files named 'die1.png', 'die2.png', etc., located in the 'images' directory.
2. `let imgElement = document.getElementById('dieImage');` - This line gets a reference to the HTML element with the id 'dieImage'. This is an `img` element where the die image will be displayed.
3. `imgElement.src = imagePath;` - This line updates the `src` attribute of the `img` element to the path of the image file corresponding to the rolled die side. This causes the browser to load and display the new image.



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) Intermediate JavaScript course materials by [Brian Bird](https://profbird.dev), written in <time>2024</time>, are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------

