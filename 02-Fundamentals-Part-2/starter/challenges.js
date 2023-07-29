'use strict';

// Defining the functions
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

function checkWinner(avgD, avgK) {
	if (avgD >= 2 * avgK) {
		console.log(`Dolphins win (${avgD} vs. ${avgK})`);
	} else if (avgK >= 2 * avgD) {
		console.log(`Koalas win (${avgK} vs. ${avgD})`);
	} else {
		console.log('No team wins...');
	}
}

// Making the calculations
const scoreDolphins = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 49);
checkWinner(scoreDolphins, scoreKoalas);
