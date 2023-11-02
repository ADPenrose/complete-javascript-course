'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };

const renderCountry = function (data, className = '') {
  // Setting the HTML for the cards.
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// // Function that creates a country card.
// const getCountryAndNeighbour = function (country) {
//   // AJAX country 1
//   const request = new XMLHttpRequest();
//   // Open the request.
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   // Send the request. Since it is an async operation, we cannot just
//   // store the response into a variable. To solve that, we can add
//   // an event listener with the load event, which will be emitted
//   // when the data is fetched.
//   request.send();
//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//     // Get neighbour country
//     const neighbour = data.borders?.[0];
//     // console.log(neighbour);

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // Since the function has an AJAX call, these two AJAX calls are executed "in parallel",
// // so whichever one responds first will be the first that will be rendered.
// getCountryAndNeighbour('mexico');
// getCountryData('portugal');

// // Function that creates a country card.
// const getCountryData = function (country) {
//   // Create the request object.
//   const request = new XMLHttpRequest();
//   // Open the request.
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   // Send the request. Since it is an async operation, we cannot just
//   // store the response into a variable. To solve that, we can add
//   // an event listener with the load event, which will be emitted
//   // when the data is fetched.
//   request.send();
//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//   });
// };

// // Since the function has an AJAX call, these two AJAX calls are executed "in parallel",
// // so whichever one responds first will be the first that will be rendered.
// getCountryData('mexico');
// getCountryData('portugal');

//   const request = new XMLHttpRequest();
//   // Open the request.
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   // Send the request. Since it is an async operation, we cannot just
//   // store the response into a variable. To solve that, we can add
//   // an event listener with the load event, which will be emitted
//   // when the data is fetched.
//   request.send();

// Fetch API
const getCountryData = function (country) {
  // Simple GET request. The "then" method allows us to handle the fulfilled state
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(function (response) {
      // console.log(response);
      // This method is attached to all response objects, and it allows us to access the data
      // of the response. However, it also returns a promise, so we need to work with it using
      // another then.
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
// getCountryData('mexico');

const getJSON = function (url, errorMsg = 'Something went wrong :c') {
  return fetch(url).then(response => {
    // If the response is not a 200 (not ok), we throw a new error that is
    // clearer than the default one.
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

// // The same, but with arrow functions
// const getCountryData = function (country) {
//   // Simple GET request. The "then" method allows us to handle the fulfilled state.
//   // Country 1.
//   getJSON(
//     `https://countries-api-836d.onrender.com/countries/name/${country}`,
//     'Country Not Found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2.
//       return getJSON(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
//         'Neighbour not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       renderError(`${err.message}`);
//     })
//     // This next block is executed no matter what.
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// 1.
// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       // If the status is different than 200, we need to throw an error for all possible responses.
//       // According to the API docs, there are only 4 bad responses, but I will only implement one
//       // for the sake of time.
//       if (!response.ok) {
//         throw new Error(
//           `There was a problem with the structure of your request. Please verify it and try again (${response.status})`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
//       );
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   // Generating a blocking event through a really long task on a promise
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(res);
// });
// console.log('Test End');

// Creating a promises
// The promise constructor function takes only one argument, which is called
// the executor function. It is executed as soon as the object is created.
// Now, two functions are passed into the executor function, which are
// the resolve and the reject functions.
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening!');
//   // Timeout that simulates waiting for a result.
//   setTimeout(function () {
//     // Here, the future value for the promise is produced.
//     if (Math.random() >= 0.5) {
//       // Settles the promise as fulfilled.
//       // Into this function, we pass the fullfiled value of the promise so that it
//       // can later be consumed and dealt with using the then function.
//       resolve('You win!');
//     } else {
//       // Settles the promise as rejected.
//       // Data inside of this function can be later dealt with using the catch function.
//       // reject('You lost your money :c');
//       reject(new Error('You lost your money :c'));
//     }
//   }, 2000);
// });

// // Consuming the promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying the setTimeout function.
// const wait = function (seconds) {
//   // Since it's impossible for a timer to fail, we can ommit the reject function.
//   return new Promise(function (resolve) {
//     // We can just resolve promises without giving them a value.
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// With promises
// wait(1)
//   .then(res => {
//     console.log('I waited for 1 seconds');
//     return wait(1);
//   })
//   .then(res => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(res => {
//     console.log('I waited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 4 second'));

// With callbacks (callback hell)
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Creating a fulfilled/rejected promise immediately.
// Promise.resolve('Resolved immediately').then(x => console.log(x));
// Promise.reject(new Error('Rejected immediately')).catch(x => console.error(x));

// Promisifying a call to the Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // A simpler way
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(lat, lng);
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then(response => {
      // If the status is different than 200, we need to throw an error for all possible responses.
      // According to the API docs, there are only 4 bad responses, but I will only implement one
      // for the sake of time.
      if (!response.ok) {
        throw new Error(
          `There was a problem with the structure of your request. Please verify it and try again (${response.status})`
        );
      }
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(
        `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
      );
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(err.message))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
