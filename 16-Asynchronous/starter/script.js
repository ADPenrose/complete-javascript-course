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
  countriesContainer.style.opacity = 1;
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
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     // A simpler way
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       console.log(lat, lng);
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//       );
//     })
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

// btn.addEventListener('click', whereAmI);'
///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imageContainer = document.querySelector('.images');
// let image;

// const wait = function (seconds) {
//   // Since it's impossible for a timer to fail, we can ommit the reject function.
//   return new Promise(function (resolve) {
//     // We can just resolve promises without giving them a value.
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imageContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found.'));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(res => {
//     image = res;
//     return wait(2);
//   })
//   .then(res => {
//     image.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(res => {
//     image = res;
//     return wait(2);
//   })
//   .then(res => (image.style.display = 'none'))
//   .catch(err => console.error(err));

// Async/Await
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     // A simpler way
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     // The await keyword allows the function to wait for the result of the promise, stopping the
//     // code execution at this point, until the promise is fulfilled. Since this function is running
//     // asynchronously in the background, stopping it does not stop the main thread of execution.
//     // Once the fetch operation gets a response (the promise settles), then we move on to print it.
//     // Geolocation:
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;

//     // Reverse geocoding:
//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//     );
//     // Checking if the response is not ok:
//     if (!resGeo.ok) throw new Error('Problem getting location data');

//     const resGeoJSON = await resGeo.json();
//     // console.log(resGeoJSON);

//     // Country data:
//     const res = await fetch(
//       `https://countries-api-836d.onrender.com/countries/name/${resGeoJSON.countryName}`
//     );

//     // Checking if the response is not ok:
//     if (!res.ok) throw new Error('Problem getting country');

//     const resJSON = await res.json();

//     // console.log(resJSON);
//     renderCountry(resJSON[0]);

//     // Returning a value
//     return `You are in ${resGeoJSON.countryName}!`;
//   } catch (err) {
//     console.error(err);
//     // Rejecting the promise manually:
//     throw err;
//   }
// };

// // Using an IIFE to transform these into an async function.
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (error) {
//     console.error(error);
//   }
//   console.log('Last print before function code ends');
// })();

// // whereAmI()
// //   .then(city => console.log(city))
// //   .catch(err => console.error(err.message));
// console.log('Since the function is asynchronous, this will be printed first.');

// // Try...catch
// // try {
// //   const x = 1;
// //   // This causes an error.
// //   x = 2;
// // } catch (err) {
// //   alert(err.message);
// // }

// // Promises in parallel
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // Running promises in a sequence.
//     // const [data1] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
//     // );
//     // const [data2] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
//     // );
//     // const [data3] = await getJSON(
//     //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
//     // );

//     // console.log(data1.capital, data2.capital, data3.capital);

//     // Takes an array of promises, and returns a promise that will run all the promises in the
//     // array at the same time. This is what allows us to run promises in parallel.
//     const data = await Promise.all([
//       getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1s}`),
//       getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
//       getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
//     ]);
//     console.log(data.map(country => country[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3Countries('mexico', 'italy', 'germany');

// Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/germany`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (seconds) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('request took too long!'));
//     }, seconds);
//   });
// };

// Promise.race([
//   getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`),
//   timeout(1000),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled
// // Promise.allSettled([
// //   Promise.resolve('Success'),
// //   Promise.reject('Error'),
// //   Promise.resolve('Another success'),
// // ]).then(res => console.log(res));

// // Promise.any
// Promise.any([
//   // This is the promise that will be returned.
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// 1.
const loadNPause = async function () {
  try {
    // First image
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    // Second image
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

// 2.
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const data = await Promise.all(imgs);
    data.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
