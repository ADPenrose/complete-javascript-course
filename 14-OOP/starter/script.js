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

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const car1 = new Car('Ford', 120);
// console.log(car1.speedUS);
// car1.accelerate();
// car1.brake();
// car1.speedUS = 50;

// Inheritance between "classes" using constructor functions
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // This is the link that allows all student instances to inherit the methods from Person.
// Student.prototype = Object.create(Person.prototype);
// // Fixing the constructor so that instances point to the correct constructor.
// Student.prototype.constructor = Student;

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce();
// mike.calcAge();
// console.log(mike.__proto__ === Student.prototype);
// console.log(mike.__proto__.__proto__ === Person.prototype);
// console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// // 1.
// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Linking prototypes
// EV.prototype = Object.create(Car.prototype);
// // Setting up EV as the constructor for the object
// EV.prototype.constructor = EV;

// // 2.
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// // 3.
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `Tesla going at ${this.speed} km/h, with a charge of ${this.charge}%`
//   );
// };

// const car1 = new EV('Tesla', 120, 23);
// console.log(car1);
// car1.chargeBattery(95);
// car1.accelerate();
// car1.brake();

// Inheritance between classes using ES6 classes
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

// // The keyword "extends" links the prototypes BTS.
// class StudentCl extends PersonCl {
//   // Recieves same args as parent class, plus the ones needed for this specific class.
//   // If we don't have any new methods or properties to add, we can just ommit the constructor
//   // function and everything will work just fine.
//   constructor(fullName, birthYear, course) {
//     // We call the constructor function of the parent class.
//     // ALWAYS NEED TO HAPPEN FIRST! This is the responsible of creating the this keyword
//     // in this subclass.
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }

//   calcAge() {
//     console.log(
//       `I'm ${2037 - this.birthYear} years old, but I feel like 10 years older!`
//     );
//   }
// }
// const martha = new StudentCl('Martha Jones', 2012, 'CS');
// martha.introduce();
// martha.calcAge();

// Inheritance between classes using Object.create
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
// // Setting the proto of student to point to the prototype of person
// const StudentProto = Object.create(PersonProto);
// // Adding an init function to the student proto
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };
// // Adding another method
// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// // Creating an object that points to the prototype of student
// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'CS');
// jay.introduce();
// jay.calcAge();

// class Account {
//   // 1) Public fields (instances)
//   locale = navigator.language;

//   // 2) Private fields (instances)
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//     console.log(`Thanks for opening an account, ${owner}`);
//   }
//   // 3. Public methods
//   // Public interface for getting movements.
//   getMovements() {
//     return this.#movements;
//   }

//   // It is a best practice to avoid modifying properties directly, and instead do it through methods. This is the public interface, which means that it can be accessed by anyone.
//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }

//   withdrawal(val) {
//     this.deposit(-val);
//     return this;
//   }

//   requestLoan(val) {
//     if (this.#approveLoan(val)) {
//       this.deposit(val);
//       console.log('Loan approved');
//       return this;
//     }
//   }

//   // 4. Private methods
//   #approveLoan(val) {
//     return true;
//   }

//   static helper() {
//     console.log('Help');
//   }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(250);
// acc1.withdrawal(-140);
// acc1.requestLoan(1000);
// console.log(acc1.getMovements());
// console.log(acc1);
// Account.helper();

// // Chaining methods
// acc1
//   .deposit(300)
//   .deposit(500)
//   .withdrawal(35)
//   .requestLoan(25000)
//   .withdrawal(4000);

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}

// 1.
class EVCl extends CarCl {
  // 2.
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const car1 = new EVCl('Rivian', 120, 23);
console.log(car1);
car1.chargeBattery(95).accelerate().brake();
