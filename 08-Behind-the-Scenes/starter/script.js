'use strict';

function calcAge(birthYear) {
	const age = 2037 - birthYear;
	function printAge() {
		let output = `${firstName}, you are ${age}, born in ${birthYear}`;
		console.log(output);

		if (birthYear >= 1981 && birthYear <= 1996) {
			const firstName = 'Steven';
			var millenial = true;
			const str = `Oh, and you are a millenial, ${firstName}`;
			console.log(str);

			function add(a, b) {
				return a + b;
			}
			// output = 'New Output!';
		}
		console.log(millenial);
		// add(2, 3);
		console.log(output);
	}
	printAge();
	return age;
}

const firstName = 'Jonas';
calcAge(1991);

console.log(True);
