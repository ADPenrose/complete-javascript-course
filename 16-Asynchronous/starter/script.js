'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
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

// Function that creates a country card.
const getCountryAndNeighbour = function (country) {
  // AJAX country 1
  const request = new XMLHttpRequest();
  // Open the request.
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  // Send the request. Since it is an async operation, we cannot just
  // store the response into a variable. To solve that, we can add
  // an event listener with the load event, which will be emitted
  // when the data is fetched.
  request.send();
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];
    // console.log(neighbour);

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

// Since the function has an AJAX call, these two AJAX calls are executed "in parallel",
// so whichever one responds first will be the first that will be rendered.
getCountryAndNeighbour('mexico');
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
