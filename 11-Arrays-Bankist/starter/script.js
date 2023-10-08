'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // Clearing the elements inside of the container
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (mov) {
  const balance = mov.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  // Incomes
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  // Outcomes
  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);

  // Interest
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 0.012)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int);

  // Labels
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Slice method
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());

// Splice method
// These two will return the same thing
// console.log(arr.splice(2));
// console.log(arr);
// Deleting the last element of an array
// arr.splice(-1);
// console.log(arr);
// // Deleting two elements, starting from position one
// arr.splice(1, 2);

//  Reverse method
// let arr2 = ['f', 'g', 'h', 'i', 'j'];
// console.log(arr2.reverse());
// console.log(arr2);

// // Concat method
// // Joining the contents of arr2 to arr1
// const letters = arr.concat(arr2);
// console.log(letters);

// // Join method
// console.log(letters.join('-'));

// // At method
// // These two do the same
// console.log(arr[0]);
// console.log(arr.at(0));

// // Getting the last element of an array of unknown length with brackets notation
// console.log(arr[arr.length - 1]);
// // Getting the last element of an array of unknown length with the slice method
// console.log(arr.slice(-1)[0]);
// // Getting the last element of an array of unknown length with the at method
// console.log(arr.at(-1));
// // Using the at method with strings
// console.log('arturo'.at(0));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Looping with for-of
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i+1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// Looping with forEach
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// forEach with Maps
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// forEach with Sets
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${_}: ${value}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const checkDogs = function (dogsJulia, dogsKate) {
//   // Creating a shallow copy
//   const copyDogsJulia = dogsJulia.slice();
//   // Removing the first and last two elements from the shallow copy
//   copyDogsJulia.splice(0, 1);
//   copyDogsJulia.splice(-2);
//   // Creating an array with both Julia's (corrected) and Kate's data
//   const joinedData = copyDogsJulia.concat(dogsKate);
//   // For each dog, log if it is an adult or a puppy
//   joinedData.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// map, filter, reduce
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUSD = 1.1;

// Map method
// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUSD;
// });

// // Using an arrow function as a callback function
// const movementsUSDArrow = movements.map(mov => mov * euroToUSD);

// console.log(movements);
// console.log(movementsUSD);
// console.log(movementsUSDArrow);

// const movementsUSDFor = [];
// for (const mov of movements) {
//   movementsUSDFor.push(mov * euroToUSD);
// }
// console.log(movementsUSDFor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescriptions);

// Filter method
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// // Filtering using the for-of loop
// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// // Mini-challenge: withdrawals
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// // Mini-challenge: withdrawals with for-of
// const withdrawalsFor = [];
// for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
// console.log(withdrawalsFor);

// Reduce method
// console.log(movements);
// // accum is the accumulator
// const balance = movements.reduce(function (acc, curr, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + curr;
// }, 0);
// console.log(balance);

// Reduce method with an arrow function
// const balanceArrow = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balanceArrow);

// // Maximum value
// // const max = movements.reduce((acc, mov) => {
// //   if (acc >= mov) {
// //     return acc;
// //   } else {
// //     return mov;
// //   }
// // }, 0);
// // console.log(max);

// const max = movements.reduce((acc, mov) => (acc >= mov ? acc : mov), 0);
// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK
*/

// const calcAverageHumanAge = function (arr) {
//   // This will return the sum of all of the converted dog ages to human ages, after certain filters where applied.
//   const humanAges = arr
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(calcHumanAge => calcHumanAge >= 18);
//   console.log(humanAges);

//   const sumHumanAges = humanAges.reduce(
//     (acc, currHumanAge) => acc + currHumanAge,
//     0
//   );
//   // Return the average value of the final human-converted dog ages.
//   return sumHumanAges / humanAges.length;
// };

// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Chaining methods
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * euroToUSD;
//   })
//   .reduce((acc, curr) => (acc + curr), 0);

// console.log(totalDepositsUSD);
