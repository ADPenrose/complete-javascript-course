'use strict';

// const bookings = [];

// //   Default parameters in ES6
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // Default parameters in ES5
//   //   numPassengers ||= 1;
//   //   price ||= 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123', 2);
// createBooking('LH123', undefined, 800);

const flight = 'LH234';
const arturo = {
  name: 'Arturo Avila',
  passport: 343434,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 343434) {
    alert('Checked in');
  } else alert('Wrong passport');
};

// checkIn(flight, arturo);
// console.log(flight);
// console.log(arturo);

// // The latter is the same as...
// const flightNum = flight;
// const passenger = arturo;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

newPassport(arturo);
checkIn(flight, arturo);
