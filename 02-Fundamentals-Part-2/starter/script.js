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
function cutFruitPieces(fruit) {
	return fruit * 4;
}

function fruitProcessor(apples, oranges) {
	const applePieces = cutFruitPieces(apples);
	const orangePieces = cutFruitPieces(oranges);

	const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
	// Returning a value
	return juice;
}
console.log(fruitProcessor(2, 3));
