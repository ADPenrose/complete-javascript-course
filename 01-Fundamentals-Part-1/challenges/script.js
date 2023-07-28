// // 1.
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// let BMIMark = massMark / (heightMark * heightMark);
// let BMIJohn = massJohn / (heightJohn * heightJohn);

// const markHigherBMI = BMIMark > BMIJohn;

// console.log(BMIMark, BMIJohn, markHigherBMI);

// // 2.
// if (BMIMark > BMIJohn) {
// 	console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
// } else {
// 	console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
// }

// 3.
// const scoreDolphins = (97 + 112 + 101) / 3;
// const scoreKoalas = (109 + 95 + 106) / 3;

// if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
// 	console.log('Dolphins win the trophy');
// } else if (scoreDolphins < scoreKoalas && scoreKoalas >= 100) {
// 	console.log('Koalas win the trophy');
// } else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100) {
// 	console.log('Both win the trophy');
// } else {
// 	console.log('No one wins the trophy :c');
// }

// 4.
const billValue = 275;
const tip =
	billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;
console.log(
	`The bill was ${billValue}, the tip was ${tip}, and the total value is ${
		billValue + tip
	}`
);
