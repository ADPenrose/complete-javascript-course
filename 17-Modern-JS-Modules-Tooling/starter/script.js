// Importing module
// We can change the names of the imported data.
// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// Calling the imported function and the imported values.
// addToCart('bread', 5);
// console.log(price, qt);

// console.log('Importing module');

// // Importing all of the exports of a module at once.
// // import * as ShoppingCart from './shoppingCart.js';
// // ShoppingCart.addToCart('bread', 5);

// // Importing the default export of a module.
// import add from './shoppingCart.js';
// add('pizza', 2);

// Mixing default and named imports. USUALLY NOT DONE IN PRACTICE.
// import add, { totalPrice as price, qt } from './shoppingCart.js';

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart);

// console.log(cart);

// This will not work, since the value is not exported in the module.
// console.log(shippingCost);

// Top-level await
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// Using the then method to consume the promise. Not very clean.
// const lastPost = getLastPost();
// lastPost.then(response => console.log(response));

// We can use top-level await for this
// const lastPostAwaited = await getLastPost();
// console.log(lastPostAwaited);

// // The old module pattern. We have a closure in here.
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   // All of the stuff declared above is not public. To make a public
//   // API out of it, we need to return the data that we want to have on
//   // that API inside of an object.
//   return { addToCart, cart, totalPrice, totalQuantity };
// })();
// // Accesible
// ShoppingCart2.addToCart('apple', 4);
// // Not accesible (undefined)
// console.log(ShoppingCart2.shippingCost);

// CommonJS Modules (will not work on the web, but will work in NodeJs)
// Export (imagine that this is on a ./shoppingCart.js file)
// exports.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// // Import
// const { addToCart } = requiere('/shoppingCart.js');

// Introduction to NPM
// Importing modules without NPM
// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
// Importing modules using Parcel
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
// Shallow copy
const stateClone = Object.assign({}, state);
// Deep copy
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

Promise.resolve('Test');

// Polyfilling
import 'core-js/stable';

// Polyfilling async functions
import 'regenerator-runtime/runtime.js';
