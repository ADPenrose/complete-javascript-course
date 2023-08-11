'use strict';

// Function scope
// function calcAge(birthYear) {
// 	const age = 2037 - birthYear;
// 	function printAge() {
// 		let output = `${firstName}, you are ${age}, born in ${birthYear}`;
// 		console.log(output);

// 		if (birthYear >= 1981 && birthYear <= 1996) {
// 			const firstName = 'Steven';
// 			var millenial = true;
// 			const str = `Oh, and you are a millenial, ${firstName}`;
// 			console.log(str);

// 			function add(a, b) {
// 				return a + b;
// 			}
// 			// output = 'New Output!';
// 		}
// 		console.log(millenial);
// 		// add(2, 3);
// 		console.log(output);
// 	}
// 	printAge();
// 	return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);

// console.log(True);

// TDZ and hoisting
// console.log(me);
// console.log(job);
// console.log(year);

// var me = 'Arturo';
// let job = 'dev';
// const year = 1991;

// console.log(addDecl(1, 2));
// console.log(addExpr(1, 2)); // TypeError because addExpr wil be undefined
// console.log(addArrow(1, 2));

// function addDecl(a, b) {
// 	return a + b;
// }

// var addExpr = function (a, b) {
// 	return a + b;
// };

// const addArrow = (a, b) => a + b;

// The this keyword
// console.log(this); // Points to the window object

// const calcAge = function (birthYear) {
// 	console.log(2037 - birthYear);
// 	console.log(this); // Undefined when the function is called
// };
// calcAge(1991);

// const calcAgeArrow = (birthYear) => {
// 	console.log(2037 - birthYear);
// 	console.log(this); // Points to the this of its parent element, which is the window. It is a lexical this.
// };
// calcAgeArrow(1991);

// const jonas = {
// 	year: 1991,
// 	calcAge: function () {
// 		console.log(2037 - this.year); // Points to the object that contains the method.
// 	},
// };
// jonas.calcAge();

// const matilda = {
// 	year: 2017,
// };

// matilda.calcAge = jonas.calcAge; // Method borrowing.
// matilda.calcAge(); // Now this will point to matilda.

// Regular functions vs arrow functions
// const jonas = {
// 	firstName: 'Arturo',
// 	year: 1991,
// 	// Solution 1:
// 	// calcAge: function () {
// 	// 	console.log(2037 - this.year); // Points to the object that contains the method.
// 	// 	const self = this; // This ensures that the this keyword inside the following function can access the year variable. We could use an arrow function instead.
// 	// 	const isMillenial = function () {
// 	// 		console.log(self.year >= 1981 && self.year <= 1996);
// 	// 	};
// 	// 	isMillenial(); // The this keyword will point to the calcAge function
// 	// },

// 	// Solution 2:
// 	calcAge: function () {
// 		console.log(2037 - this.year); // Points to the object that contains the method.
// 		const isMillenial = () => {
// 			console.log(this.year >= 1981 && this.year <= 1996);
// 		};
// 		isMillenial(); // The this keyword will point to the Jonas object
// 	},
// 	greet: () => console.log(`Hey, ${this.firstName}`), // This will point to the global scope, and will return undefined since the window object does not have this variable defined.
// };
// jonas.greet();
// jonas.calcAge();

// The arguments keyword
const addExpr = function (a, b) {
	console.log(arguments); // Prints the arguments array.
	return a + b;
};
addExpr(2, 5);

var addArrow = (a, b) => {
	console.log(arguments); // Returns a ReferenceError.
	return a + b;
};
addArrow(2, 5);
