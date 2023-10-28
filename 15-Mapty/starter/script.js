'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // In km
    this.duration = duration; // In min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // Min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
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
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  constructor() {
    // Get the current position.
    this._getPosition();
    // Get data from local storage.
    this._getLocalStorage();
    // Add a listener to the submit event of the form.
    form.addEventListener('submit', this._newWorkout.bind(this));
    // Show either the cadence or elevation input field, depending on the selected value on the type field.
    inputType.addEventListener('change', this._toggleElevationField);
    // Adding an event listener through event delegation to an element that does not exist yet.
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    // console.log(`https://www.google.com.mx/maps/@${latitude},${longitude}`);

    // Creating an array of coords.
    const coords = [latitude, longitude];

    // Creating the map. The value inside the map function is the id of the HTMl element
    // where the map should be rendered.
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(map);

    // Setting the style of the layers.
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // // Adding a marker.
    // L.marker(coords)
    //   .addTo(this.#map)
    //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    //   .openPopup();

    // Adding an event listener, but using code from the Leaflet lib
    this.#map.on('click', this._showForm.bind(this));

    // Render workouts on the sidebar list.
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    // Storing the map event on a global variable for later use.
    this.#mapEvent = mapE;
    // Showing the form.
    form.classList.remove('hidden');
    // Activating the distance input.
    inputDistance.focus();
  }

  _hideForm() {
    // Clearing input fields.
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // Helper function for data validation.
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    // Helper function for checking if values are negarive.
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Preventing the form from refreshing the page on upload.
    e.preventDefault();

    // Get data from the form.
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout is running, create running object.
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid.
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      // Create new running object.
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create cycling object.
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      // Create new cycling object.
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array.
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as marker.
    this._renderWorkoutMarker(workout);

    // Render workout on list.
    this._renderWorkout(workout);

    // Hidding the form.
    this._hideForm();

    // Save all workouts to local storage.
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;

    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>`;
    }

    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // Moving from the element clicked to the parent workout item using closest.
    const workoutEl = e.target.closest('.workout');
    // Ignoring clicks if there is no workout parent element.
    if (!workoutEl) return;
    // console.log(workoutEl);

    // Getting the workout element.
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // Moving marker into view.
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    // Using the public interface.
    // workout.click();
  }

  _setLocalStorage() {
    // Saving JSON objects as a JSON string to the local storage.
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    // Transform a JSON string to an object.
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);

    if (!data) return;

    // Our workouts object should be set to have the values in the local storage.
    this.#workouts = data;

    // Render workouts on the sidebar list.
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
