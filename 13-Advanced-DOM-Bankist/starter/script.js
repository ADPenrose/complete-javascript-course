'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(cur => cur.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // // Get current element DOMrect
  // console.log(e.target.getBoundingClientRect());
  // // Getting current scroll
  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
  // // Getting height and width of the viewport
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling (wihtout animation)
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // Scrolling (wth animation) OLD SCHOOL
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // Button Scrolling (with animation) NEW SCHOOL
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation (not efficient version)
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Page navigation (thourgh event delegation)
// 1. Add event listener to common parent of elements of interest
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  // Matching strategy
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// // Select the entire document
// console.log(document.documentElement);

// // Selecting the document's head and body
// console.log(document.head);
// console.log(document.body);

// Using querySelector and querySelectorAll
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// Selecting element by id
document.getElementById('section--1');

// Selecting element by tag name
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// Selecting elements by class name
// console.log(document.getElementsByClassName('btn'));

// Creating elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved funcionality and analytics.';
message.innerHTML =
  'We use cookies for improved funcionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

// // Copying the element
// header.append(message.cloneNode(true));

// Inserting elements before or after an element (as siblings in both cases)
header.before(message);
// header.after(message);

// Deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // Before, it was done through the parent element
    // message.parentElement.removeChild(message)
  });

// Stlyes
// Set styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// // Read inline styles
// console.log(message.style.width);
// // Read styles that are not inline
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// Operating with styles
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// // Modifying CSS custom vars/properties
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// // Accessing attributes (only works for standard properties)
// console.log(logo.alt);
// console.log(logo.className);
// // Accessing non-standard attributes
// console.log(logo.getAttribute('designer'));
// // Setting values for attributes
// logo.alt = 'Beautiful minimalist logo';
// // Creating attributes
// logo.setAttribute('company', 'Bankist');
// // Absolute url (localhost:xyz) vs relative url (img/img.png)
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// Don't use. This will format everything and only allow for one class.
// logo.className = 'jonas'

// // Types of Events and Event Handlers
// const h1 = document.querySelector('h1');

// // Removing event listeners
// const alertH1 = function (e) {
//   alert('addEventLister: Great! You are reading the heading.');
//   // We can remove it here:
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// // Mouse enter
// h1.addEventListener('mouseenter', alertH1);

// // Or here:
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // Using onevent properties
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading.');
// };

// Generating a random color
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// // e.target points to the element where the event was originated
// // e.currentTarget points to the element to which the event handler is attached === this keyword
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
//   // Stop propagation
//   // e.stopPropagation();
// });

// // Setting the event listener to listen in catching instead of bubbling
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   }
//   // true
// );
