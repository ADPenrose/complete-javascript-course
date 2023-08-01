'use strict';

// 1. Defining the functions
// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// function checkWinner(avgD, avgK) {
// 	if (avgD >= 2 * avgK) {
// 		console.log(`Dolphins win (${avgD} vs. ${avgK})`);
// 	} else if (avgK >= 2 * avgD) {
// 		console.log(`Koalas win (${avgK} vs. ${avgD})`);
// 	} else {
// 		console.log('No team wins...');
// 	}
// }

// // Making the calculations
// const scoreDolphins = calcAverage(44, 23, 71);
// const scoreKoalas = calcAverage(65, 54, 49);
// checkWinner(scoreDolphins, scoreKoalas);

// // 2.
// function calcTip(billValue) {
// 	return billValue >= 50 && billValue <= 300
// 		? billValue * 0.15
// 		: billValue * 0.2;
// }

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

// // The same function, but implemented as an arrow function
// // const calcTip = (billValue) =>
// // 	billValue >= 50 && billValue <= 300 ? billValue * 0.1 : billValue * 0.2;

// console.log(calcTip(40));

// // 3.
// const mark = {
// 	fullName: 'Mark Miller',
// 	mass: 78,
// 	height: 1.69,
// 	calcBMI: function () {
// 		this.bmi = this.mass / (this.height * this.height);
// 		return this.bmi;
// 	},
// };

// const john = {
// 	fullName: 'John Smith',
// 	mass: 92,
// 	height: 1.95,
// 	calcBMI: function () {
// 		this.bmi = this.mass / (this.height * this.height);
// 		return this.bmi;
// 	},
// };

// if (mark.calcBMI() > john.calcBMI()) {
// 	console.log(
// 		`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`
// 	);
// } else {
// 	console.log(
// 		`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`
// 	);
// }

// 3.
