// Exporting module
console.log('Exporting module');

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished fetching');

// We can only use these values here, in this file.
const shippingCost = 10;
export const cart = [];

// Named export.
// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// Exporting multiple things at the same time using named exports.
const totalPrice = 237;
const totalQuantity = 23;
// We can change the names of the exported data.
export { totalPrice, totalQuantity as qt };

// Default export. Used when we only want to export one thing per module.
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
