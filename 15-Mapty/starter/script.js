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

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // In km
    this.duration = duration; // In min
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // Min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    // Km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cln1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cln1);

/////////////////////////////////////////
// APPLICATION ARCHITECURE
class App {
  #map;
  #mapEvent;
  constructor() {
    // Get the current position
    this._getPosition();
    // Add a listener to the submit event of the form.
    form.addEventListener('submit', this._newWorkout.bind(this));
    // Show either the cadence or elevation input field, depending on the selected value on the type field.
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // Using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('Could not get your position!');
      }
    );
  }

  _loadMap(position) {
    // Getting the coordinates
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // Creating a Google Maps URL using our coords data.
    console.log(`https://www.google.com.mx/maps/@${latitude},${longitude}`);

    // Creating an array of coords.
    const coords = [latitude, longitude];

    // Creating the map. The value inside the map function is the id of the HTMl element
    // where the map should be rendered.
    this.#map = L.map('map').setView(coords, 13);
    // console.log(map);

    // Setting the style of the layers.
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Adding a marker.
    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();

    // Adding an event listener, but using code from the Leaflet lib
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    // Storing the map event on a global variable for later use.
    this.#mapEvent = mapE;
    // Showing the form.
    form.classList.remove('hidden');
    // Activating the distance input.
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // Preventing the form from refreshing the page on upload.
    e.preventDefault();
    // Clearing input fields.
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // console.log(mapEvent);
    // Getting the coordinates of the clicked point.
    const { lat, lng } = this.#mapEvent.latlng;
    // Creating the marker on the clicked point.
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Hello')
      .openPopup();
  }
}

const app = new App();
