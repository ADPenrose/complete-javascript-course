'use strict';

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriverLicense = true;
// if (hasDriversLicense) console.log('I can drive!');

// const private = 345;

// Defining functions
// function logger() {
// 	// All the code inside the curly braces is called the "function body"
// 	console.log('My name is Jonas');
// }

// logger(); // This is called invoking/calling/running the function

// // Defining a function that takes inputs using parameters
// function fruitProcessor(apples, oranges) {
// 	console.log(apples, oranges);
// 	const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
// 	// Returning a value
// 	return juice;
// }

// // Calling the function and giving it arguments
// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// Function Declarations
// function calcAge1(birthYear) {
// 	return 2037 - birthYear;
// }

// const age1 = calcAge1(1991);

// // Function Expressions
// const calcAge2 = function (birthYear) {
// 	return 2037 - birthYear;
// };
// const age2 = calcAge2(1991);

// console.log(age1, age2);

// Arrow Functions
// const calcAge3 = (birthYear) => 2037 - birthYear;
// console.log(calcAge3(1991))

// const yearsUntilRetirement = (birthYear, firstName) => {
// 	const age = 2037 - birthYear;
// 	const retirement = 65 - age;
// 	return `${firstName} retires in ${retirement} years.`;
// }
// console.log(yearsUntilRetirement(1991, 'Jonas'));
// console.log(yearsUntilRetirement(1980, 'Bob'));

// Functions calling other functions
/* function cutFruitPieces(fruit) {
	return fruit * 4;
}

function fruitProcessor(apples, oranges) {
	const applePieces = cutFruitPieces(apples);
	const orangePieces = cutFruitPieces(oranges);

	const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
	// Returning a value
	return juice;
}
console.log(fruitProcessor(2, 3)); */

// Arrays
const friends = ['Luis', 'Santy', 'Omar'];
console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

// Exercise
const calcAge = function (birthYear) {
	return 2037 - birthYear;
};

const years = [1991, 1984, 2008, 2020];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[2]);

const ages = [age1, age2, age3];
console.log(ages);

// Objects
const jonas = {
	firstName: 'Jonas',
	lastName: 'Schmedtmann',
	birthYear: 1991,
	job: 'teacher',
	friends: ['Michael', 'Peter', 'Steven'],
	hasDriversLicense: true,
	calcAge: function () {
		this.age = 2037 - this.birthYear;
		return this.age; // Returning the value is a good practice
	},
	getSummary: function () {
		return `${this.firstName} is a ${this.calcAge()}-year old ${
			this.job
		}, and he ${
			this.hasDriversLicense
				? "has a driver's license"
				: "doesn't have a driver's license"
		}.`;
	},
};

console.log(jonas.getSummary());

const interestedIn = prompt('What do you want to know?');

if (jonas[interestedIn]) {
	console.log(jonas[interestedIn]);
} else {
	console.log('Sorry, that info does no exist.');
}
