'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
// Using querySelector and querySelectorAll
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// Selecting element by tag name
const allButtons = document.getElementsByTagName('button');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

// console.log(allSections);

// console.log(allButtons);

// Selecting elements by class name
// console.log(document.getElementsByClassName('btn'));

// Creating elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved funcionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved funcionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.append(message);

// // // Copying the element
// // header.append(message.cloneNode(true));

// // Inserting elements before or after an element (as siblings in both cases)
// header.before(message);
// // header.after(message);

// Deleting elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // Before, it was done through the parent element
//     // message.parentElement.removeChild(message)
//   });

// Stlyes
// Set styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// // Read inline styles
// console.log(message.style.width);
// // Read styles that are not inline
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// Operating with styles
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// // Modifying CSS custom vars/properties
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  // Matching strategy
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;
  // Remove from all the tabs the active class
  tabs.forEach(curr => curr.classList.remove('operations__tab--active'));
  // Activate tab
  clicked.classList.add('operations__tab--active');
  // Remove from all the content containers the active class
  tabsContent.forEach(curr =>
    curr.classList.remove('operations__content--active')
  );
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const hadleHover = function (e, opacity) {
  // Matching
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sib => {
      if (sib !== link) sib.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// Using the function inside the callback function
// nav.addEventListener('mouseover', function (e) {
//   hadleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   hadleHover(e, 1);
// });

// Using bind to pass an "argunment" into a handler
// nav.addEventListener('mouseover', hadleHover.bind(0.5));

// nav.addEventListener('mouseout', hadleHover.bind(0.1));

// Using an arrow function
nav.addEventListener('mouseover', e => hadleHover(e, 0.5));

nav.addEventListener('mouseout', e => hadleHover(e, 1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation with the Intersection Observer API
// Observer callback function. This will be called when the target element intersects the root element, at the defined threshold. The entries can be an array of the threshold entries.
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// // Observer options
// const obsOptions = {
//   // The element that the target is intercepting. Setting it to null makes the viewport the root.
//   root: null,
//   // The percentage of intersection at which the observer callback will be called. This can be an
//   // array. 0% means that the callback will trigger when the section moves out of view in both
//   // directions, and the 0.2 means that the callback will trigger when the section is just moving
//   // in or out of the view.
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // Observe the target element
// observer.observe(section1);

// Calculate the margin's height dinamically
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // Add positive (downards) or negative (upwards) margin, so that the event is detected
  // later or sooner. Only works with pixels.
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // Guard clause
  if (!entry.isIntersecting) return;
  // Using the target property to see which section entered the viewport
  entry.target.classList.remove('section--hidden');
  // Unoversving the sections that are already visible
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// Adding the hidden class to the sections
allSections.forEach(function (section) {
  // Using the same observer to observe all the sections.
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
// Selecting all the images that have a certain property defined.
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  // Guard clause
  if (!entry.isIntersecting) return;
  // Replace src attribute with data-src
  entry.target.src = entry.target.dataset.src;
  // Removing the blur when the new image finishes loading
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const sliderComponent = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // Removing active class from all dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // Activating corresponding dot
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === slides.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = slides.length - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard responsiveness
  document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowLeft') prevSlide(curSlide);
    else if (e.key == 'ArrowRight') nextSlide(curSlide);
  });

  // Move by clicking dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliderComponent();

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

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

// const h1 = document.querySelector('h1');

// // Going downwards: selecting children
// // This will go as deep as the DOM tree, and only select direct children of h1.
// console.log(h1.querySelectorAll('.highlight'));
// // Get every single node that is a child of h1. Returns NodeList.
// console.log(h1.childNodes);
// // Returns elements that are children of h1. Returns an HTMLCollection.
// console.log(h1.children);
// // Selecting first and last element children.
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: selecting parents
// // These two do the same
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// // Select the closest parent element with a given selector
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// // If the selector matches the element on which we are calling the closest method, that is the element that will be selected
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: selecting siblings (only the immediate previous and next)
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// // Not so used
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// // To get all siblings, we can go to the parent element and read all of the children from there
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
