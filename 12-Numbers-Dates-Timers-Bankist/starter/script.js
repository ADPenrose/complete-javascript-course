'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-10-08T18:49:59.371Z',
    '2023-10-12T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2023-10-08T18:49:59.371Z',
    '2023-10-12T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: `${currency}`,
  }).format(value);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
    .toFixed(2);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
    .toFixed(2);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0)
    .toFixed(2);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 300;

  // Ticker function
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;
    // When 0 is reached, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1 second
    time--;
  };

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  // Return the timer
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimenting with the Intl namespace

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    const locale = currentAccount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Start logout time
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // Converting strings to ints
// console.log(Number('23'));
// console.log(+'23');

// // Parsing a number from a string. Base 10.
// console.log(Number.parseInt('30px', 10));
// // Parsing a number from a string. Base 2. Returns 3.
// console.log(Number.parseInt('11px', 2));

// // Parsing a float.
// console.log(Number.parseFloat('2.5rem', 10));

// // Check if a value is 'not a number' or NaN.
// // Returns false
// console.log(Number.isNaN(20));
// // Returns false
// console.log(Number.isNaN('20'));
// // Returns true
// console.log(Number.isNaN(+'20X'));

// // Checking if values are numbers
// // Returns true
// console.log(Number.isFinite(20));
// // Returns false
// console.log(Number.isFinite('20'));
// // Returns false
// console.log(Number.isFinite(+'20X'));
// // Returns false
// console.log(Number.isFinite(23 / 0));

// //  Square root
// console.log(Math.sqrt(25));

// // Root with exponenciation
// console.log(25 ** (1 / 2));

// // Max of given numbers. Does type coercion, but not parsing
// // Gives 23
// console.log(Math.max(5, 18, '23', 11, 2));
// // Gives NaN
// console.log(Math.max(5, 18, '23', '25px', 11, 2));

// // Min of given numbers
// // Gives 2
// console.log(Math.min(5, 18, '23', 11, 2));

// // Pi constant
// console.log(Math.PI);

// // Generate a random number between 0 and 1
// console.log(Math.random());

// // Deletes decimal part of a number
// console.log(Math.trunc(2.5345345));

// // Rounds a number to the nearest integer
// console.log(Math.round(2.3));

// // Rounds a number to the following upper integer.
// console.log(Math.ceil(2.3));

// // Rounds a number to the following lower integer.
// console.log(Math.floor(2.3));

// // Function that gives a random number between two numbers
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));

// // Rounding to a certain number of decimal places. Returns a string
// console.log((2.7).toFixed(0));
// console.log((2.7).toFixed(3));
// console.log(+(2.7567).toFixed(3));

// // The Remainder Operator
// console.log(5 % 2);

// // Checking if the number is even or not (the remainder of dividing it by two is 0).
// const isEven = num => num % 2 == 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     [...document.querySelectorAll('.movements__row')].forEach(function (
//       row,
//       i
//     ) {
//       if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     });
//   });
// });

// // Numeric Separators
// const diameter = 287_460_000_000;
// // Prints 287460000000
// console.log(diameter);

// // Invalid numeric separators
// // const PI = _3._1416__;

// // Numeric separators in strings (Invalid)
// console.log(Number('23_000'));

// // Bigint
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// // Transforming a number into a BigInt
// // Works for numbers as big as we want
// console.log(23458072345890234589783920411111111111111111111111111111111n);
// // Using the constructor with really big numbers also causes bugs
// console.log(
//   BigInt(23458072345890234589783920411111111111111111111111111111111)
// );

// // This is invalid
// // const huge = 2341234412341234n;
// // const num = 23;
// // console.log(huge * num);

// // This is valid
// console.log(20n > 15);
// // Since this values have different types, strict comparison will see them as different values
// console.log(20n === 20);
// // Here, the BigInt is converted into a string
// const huge = 2341234412341234n;
// console.log(huge + ' is REALLY big!!!');

// // Division is truncated
// // This gives 3n instead of 3.3333n
// console.log(10n / 3n);

// Create a date
// const now = new Date();
// console.log(now);

// // Create a date by parsing a string. Not a good idea generally, unless the string was created by JS.
// console.log(new Date('Oct 12 2023 20:36:51'));
// console.log(new Date('December 24, 2015'));

// console.log(new Date(account1.movementsDates[0]));

// // Giving the constructor year, month (zero based), day, hour, minute, second
// console.log(new Date(2037, 10, 19, 15, 23, 5));

// // Passing ms with respect of the Unix time (01 Jan 1970)
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);

// // Get full year (NEVER USE getYear())
// console.log(future.getFullYear());
// // Get month (zero-based)
// console.log(future.getMonth());
// // Get day of the month
// console.log(future.getDate());
// // Get day of the week (Sunday => 0)
// console.log(future.getDay());
// // Get hours, minutes and seconds
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// // Get a nicelly formatted string according to an ISO standard.
// console.log(future.toISOString());
// // Get the milliseconds that have passed since the Unix. This is called a timestamp.
// console.log(future.getTime());
// // Get the timestamp for the current moment in time.
// console.log(Date.now());
// // Updating values of a date object.
// console.log(future.setFullYear(2040));
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
// console.log(days1);

// Internationalizing numbers
// const num = 3994764.23;
// console.log(new Intl.NumberFormat(navigator.language).format(num));

// // Using an options object
// const options = {
//   style: 'unit',
//   unit: 'mile-per-hour',
//   // Remove separators
//   useGrouping: false,
// };
// console.log(new Intl.NumberFormat(navigator.language, options).format(num));

// Timers
// setTimeout(() => console.log('Here is your pizza'), 3000);
// // This is printed first, and 3 seconds later, the timer message is logged
// console.log('Waiting...');

// Passing parameters
// setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   'olives',
//   'spinach'
// );

// Cancelling the timeout
// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   ...ingredients
// );

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// A working clock that updates every second.
// setInterval(function () {
//   const now = new Date();
//   console.log(
//     new Intl.DateTimeFormat(navigator.language, {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     }).format(now)
//   );
// }, 1000);
