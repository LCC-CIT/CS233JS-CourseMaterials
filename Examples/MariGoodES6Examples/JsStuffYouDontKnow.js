/* function stuff */
//  functions assigned to a variable that are called using that variable name 
//  as if it was the function nameare called function expressions
var anon_square = function(number) { return number * number; };
var x = anon_square(6); // x gets the value 6
console.log(x);
//
var renamed_square = function square(number) { return number * number };
console.log(renamed_square(4));
//
var arrow_square = (number) => { return number * number} ;
console.log(arrow_square(3));

// once you understand function expressions you can do all kinds of 
// things with a function that you are used to doing with a variable 
// f is a function that will passed as a parameter to the function map
function map(f, a) {
  var result = []; // Create a new Array
  var i; // Declare variable
  for (i = 0; i != a.length; i++)
    result[i] = f(a[i]);
  return result;
}
var cube = function(x) {
   return x * x * x; 
}
var numbers = [0, 1, 2, 5, 10];
// the function expression cube is now passed to map
var cubedNumbers = map(cube,numbers);
console.log(cubedNumbers);


/*
  object literal
*/

var person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
// use the dot operator to access properties
console.log(person.age)
console.log(person.gender)
console.log(person.name[0])
console.log(person);
// use array-like syntax to access properties too
console.log(person['age'])
console.log(person['gender'])
// add properties "on the fly"
person['eyes'] = 'hazel';
person.farewell = function() { console.log("Bye everybody!"); }
console.log(person.eyes)
person.farewell();
// properties can be function expressions too
var person1 = {
  name: 'Chris',
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}
var person2 = {
  name: 'Brian',
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}
person1.greeting();
person2.greeting();

/* ------------
  json
*/

var superHeroes = {
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
console.log(superHeroes.homeTown);
console.log(superHeroes['active']);
console.log(superHeroes['members'][1]['powers'][2]);
var mMan = superHeroes.members[0];
console.log(mMan);


