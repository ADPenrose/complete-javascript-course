'use strict';

// In OOP, the convention is for constructor functions to start with a captial letter.
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // NEVER DO THIS TO CREATE METHODS. It is not efficient.
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// // Defining a static method
// Person.greet = function () {
//   console.log('Hello!');
// };

// Person.greet();

// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// const arturo = new Person('Arturo', 2001);
// // console.log(arturo);

// console.log(jonas instanceof Person);

// console.log(Person.prototype);

// // Prototypes
// Person.prototype.calcAge = this.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();
// arturo.calcAge();

// console.log(jonas.__proto__);
// console.log(jonas.__proto__ === Person.prototype);
// // The same, but prettier
// console.log(Person.prototype.isPrototypeOf(jonas));

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas, arturo);

// // Checking if the object owns a property
// console.log(jonas.hasOwnProperty('firstName')); // True
// console.log(jonas.hasOwnProperty('species')); // False

// console.log(jonas.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// // Arrays
// const arr = [3, 4, 5, 6, 6, 4]; // This is the same as new Array
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);
// // Going up the chain to Object.prototype
// console.log(arr.__proto__.__proto__);
// console.log(arr.__proto__.__proto__ === Object.prototype);
// // Extending the default functionality of the Array object.
// // NOT RECOMMENDED since JS could add in the future a method with the same name and cause bugs.
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };
// console.log(arr.unique());

// // DOM object
// const h1 = document.querySelector('h1');
// // The proto is HTMLHeadingElement
// console.log(h1.__proto__);

// console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// // 1.
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// // 2.
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed);
// };

// // 3.
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed);
// };

// // 4.
// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// car1.accelerate();
// car2.brake();

// ES6 classes
// Class expresion
// const PersonEx = class {};

// Class declaration
// class PersonCl {
//   // Works similarly to the constructor function, but it is a method of this class.
//   constructor(fullName, birthYear) {
//     // If we have a setter function named fullName, we will call it here instead of creating
//     // a property named fullName
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // All of the methods written outside of the constructor will be part of the prototype of the object.
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   // There are no commas between methods.
//   greet() {
//     console.log(`Hey, ${this.firstName}`);
//   }

//   // Getter
//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Setter for input validation. This will be executed when the constructor is executed to set
//   // the full name property.
//   set fullName(name) {
//     console.log(name);
//     // In order to avoid infinit recursion, we add an underscore (convention) to change the name of
//     // the property, so that it is different to the name of the setter function.
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   // Getter to return the full name
//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log(this);
//     console.log('Hello!');
//   }
// }

// // When we call the class with the new operator, the constructor funcion will be executed and
// // it will return a new object.
// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.age);

// // console.log(jessica.__proto__ === PersonCl.prototype);

// // This also works fine.
// // PersonCl.prototype.greet = function () {
// //   console.log(`Hey, ${this.firstName}`);
// // };
// jessica.greet();

// Getters and Setters
// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],
//   // Creating a getter
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   // Creating a setter
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// account.latest = 50;
// console.log(account.movements);

// PersonCl.hey();

// Object.create
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   // Similar to the constructor method in syntax. It can have any name.
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// steven.init('Steven', 1979);
// console.log(steven);
// steven.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const car1 = new Car('Ford', 120);
console.log(car1.speedUS);
car1.accelerate();
car1.brake();
car1.speedUS = 50;
