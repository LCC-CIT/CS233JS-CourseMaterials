/* -------------
  Variable scope
      var - global or function scope
      let - block scope
      const - block scope constant
*/


var me = 'global';
console.log(me);

//
var me = 'global inside a function';
function sayMe () {
  console.log(me);
}
sayMe();
//
function sayMe() {
  var me = 'function scope'
  console.log(me)
};
sayMe();
console.log(me);  // this is an error
//
var me = 'global me';
function sayMe () {
  var me = 'local me hides global';
  console.log(me);
  
}
sayMe();
console.log(me);
//
var me = 'global';
if (true) {
  console.log(me);
  var me = 'NOT block scope.  Redeclares global.';
  console.log(me)
}
console.log(me);
//
console.log("HERE");
for (var i = 1; i < 5; i++) {
  console.log(i)
  setTimeout(function () {
    console.log(i)
  }, 100)
};

console.log("Loop is finished.  Timer code.");
//


for (let i = 1; i < 5; i++) {
  console.log(i)
  setTimeout(function () {
    console.log(i)
  }, 1000)
};
console.log("Loop is finished.  Timer code.");

/* --------------
  Arrow functions
*/

function namedFunction() {
  console.log('named function');
}
namedFunction();
//
var anonymous = function() {
  console.log('anonymous function')
};
anonymous();
//
var arrow = ()=>console.log('arrow function');
arrow();

document.getElementById("mybutton").onclick = function(){console.log('anonymous')};
//
document.getElementById("mybutton").onclick = ()=>{console.log('arrow')};
//
let array = [1,7,98,5,4,2];
// anonymous function
let anonMoreThan20 = array.filter(function (num) {
  return num > 20
});
// arrow function
let arrowMoreThan20 = array.filter(num => num > 20)
console.log(arrowMoreThan20);
//

const zeroArgs = () => {/* do something */}
const zeroWithUnderscore = _ => {/* do something */}
const oneArg = arg1 => {/* do something */}
const oneArgWithParenthesis = (arg1) => {/* do something */}
const manyArgs = (arg1, arg2) => {/* do something */}
const sum1 = (num1, num2) => num1 + num2
const sum2 = (num1, num2) => { return num1 + num2 }


/* --------------- 
   this
*/


console.log(this); // Window
function hello () {
  console.log(this)
}
hello() // Window
//
let o = {
  sayThis: function() {
    console.log(this)
  }
}
o.sayThis() // o
//
var button = document.querySelector("button");
button.addEventListener('click', function() {
  console.log(this) // button
})


/*  --------------
    Destructuring
*/

const mickey = {
  firstName: 'Mickey',
  lastName: 'Mouse'
};
let { firstName, lastName } = mickey;
console.log(firstName) ;
console.log(lastName) ;
//
let course = {
  name: 'JS Fundamentals for Frontend Developers'
}
let { name: courseName } = course
console.log(courseName) // JS Fundamentals for Frontend Developers
let [one, two, , , last] = [1, 2, 3, 4, 5]
console.log(one) // 1
console.log(two) // 2
console.log(last) //5
//
let a = 2
let b = 3; // semicolon required because next line begins with a square bracket
// Swapping with destructured arrays
[a, b] = [b, a]
console.log(a) // 3
console.log(b) // 2


/* -----------------
    Template Literals
*/

const fName = 'Mickey'
const lName = 'Mouse'
const teamName = 'Disney'
const theString = `${fName} ${lName}, ${teamName}`
console.log(theString)
//

const container = document.createElement('div')
const aListOfItems =
  `<ul>
    <li>First Name: ${fName}</li>
    <li>Last Name: ${lName}</li>
    <li>Team: ${teamName}</li>
  </ul>`
console.log(aListOfItems)
container.innerHTML = aListOfItems
document.body.append(container)

















