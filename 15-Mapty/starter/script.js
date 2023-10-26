'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Using the Geolocation API
navigator.geolocation.getCurrentPosition(
  function (position) {
    // Getting the coordinates
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // Creating a Google Maps URL using our coords data.
    console.log(`https://www.google.com.mx/maps/@${latitude},${longitude}`);
  },
  function () {
    alert('Could not get your position!');
  }
);
