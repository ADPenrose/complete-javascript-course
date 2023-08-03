// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const printForecast = function (arr) {
	let arrayFormatedTemps = [];
	for (let i = 0; i < arr.length; i++) {
		arrayFormatedTemps.push(`... ${arr[i]}°C in ${i + 1} days `);
	}
	console.log(arrayFormatedTemps.join(''));
};

printForecast([17, 21, 23]);
