'use strict';

// Data needed for a later exercise
const flights =
	'_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
	[weekdays[3]]: {
		open: 12,
		close: 22,
	},
	[weekdays[4]]: {
		open: 11,
		close: 23,
	},
	[weekdays[5]]: {
		open: 0, // Open 24 hours
		close: 24,
	},
};

const restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],
	// New way of writing methods
	order(starterIndex, mainIndex) {
		return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
	},
	// Destructuring the arguments of the function as they are passed
	orderDelivery: function ({
		starterIndex = 1,
		mainIndex = 0,
		time = '20:00',
		address,
	}) {
		console.log(
			`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delirever to ${address} at ${time}`
		);
	},
	oderPasta: function (ing1, ing2, ing3) {
		console.log(
			`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
		);
	},
	orderPizza: function (mainIngredient, ...otherIngredients) {
		console.log(mainIngredient);
		console.log(otherIngredients);
	},
	// ES6 enhances object literals. Creates a property named openingHours, which points to that external object
	openingHours,
};

// Creating a map and populating it
// const question = new Map([
// 	['question', 'What is the best programming language in the world?'],
// 	[1, 'C'],
// 	[2, 'Java'],
// 	[3, 'JavaScript'],
// 	['correct', 3],
// 	[true, 'Correct!'],
// 	[false, 'Try again!'],
// ]);
// // Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Iterating over a map
// console.log(question.get('question'));
// for (const [key, value] of question) {
// 	if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// const answer = Number(prompt('Your answer: '));

// console.log(
// 	answer === question.get('correct') ? question.get(true) : question.get(false)
// );

// // Convert map to array
// console.log([...question]);

// // Using methods to get some info
// console.log([...question.keys()]);
// console.log([...question.values()]);

//////////////////
// // Maps
// const restMap = new Map();
// restMap.set('name', 'Classico Italiano');
// restMap.set(1, 'Firenze, Italy');
// console.log(restMap.set(2, 'Lisbon, Portugal'));
// // Chaining set instructions
// restMap
// 	.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
// 	.set('open', 11)
// 	.set('close', 23)
// 	.set(true, 'We are open :D')
// 	.set(false, 'We are closed :(');

// console.log(restMap.get('name'));
// console.log(restMap.get(true));
// // Combining maps with logical operators
// const time = 21;
// console.log(
// 	restMap.get(time > restMap.get('open') && time < restMap.get('close'))
// );
// // Checking if a map contains a certain key
// console.log(restMap.has('categories'));
// // Removing elements from a map
// restMap.delete('categories');
// // Checking the size of a map
// console.log(restMap.size);
// // Using arrays as a map key
// const restArray = [1, 2];
// restMap.set(restArray, 'Test');
// console.log(restMap.get(restArray));

/////////////////////////////////////////////
// Sets
// const orderedSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta']);
// console.log(orderedSet);
// console.log(orderedSet.size);
// console.log(orderedSet.has('Pizza'));
// orderedSet.add('Pizza');
// orderedSet.delete('Pizza');

// // Looping through sets
// for (const order of orderedSet) {
// 	console.log(order);
// }

// // Creating an array from a set
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// const game = {
// 	team1: 'Bayern Munich',
// 	team2: 'Borrussia Dortmund',
// 	players: [
// 		[
// 			'Neuer',
// 			'Pavard',
// 			'Martinez',
// 			'Alaba',
// 			'Davies',
// 			'Kimmich',
// 			'Goretzka',
// 			'Coman',
// 			'Muller',
// 			'Gnarby',
// 			'Lewandowski',
// 		],
// 		[
// 			'Burki',
// 			'Schulz',
// 			'Hummels',
// 			'Akanji',
// 			'Hakimi',
// 			'Weigl',
// 			'Witsel',
// 			'Hazard',
// 			'Brandt',
// 			'Sancho',
// 			'Gotze',
// 		],
// 	],
// 	score: '4:0',
// 	scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// 	date: 'Nov 9th, 2037',
// 	odds: {
// 		team1: 1.33,
// 		x: 3.25,
// 		team2: 6.5,
// 	},
// };

// // 1.
// for (const [goal, player] of game.scored.entries()) {
// 	console.log(`Goal ${goal + 1}: ${player}`);
// }

// // 2.
// let sumOdds = 0;
// const arrayOdds = Object.values(game.odds);
// for (const odd of arrayOdds) {
// 	sumOdds += odd;
// }
// console.log(sumOdds / arrayOdds.length);

// // 3.
// for (const [team, odd] of Object.entries(game.odds)) {
// 	const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
// 	console.log(`Odd of ${teamStr}: ${odd}`);
// }

// // 4.
// const scorers = {};

// for (const player of game.scored) {
// 	scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }

// console.log(scorers);

//////////////////////////////////////
// Looping objects
// Looping over keys
// for (const day of Object.keys(openingHours)) {
// 	console.log(day);
// }

// // Looping over values
// const values = Object.values(openingHours);
// console.log(values);

// // Getting entries (keys and values)
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
// 	console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// restaurant.orderDelivery({
// 	time: '22:30',
// 	address: 'Via del Sole, 21',
// 	mainIndex: 2,
// 	starterIndex: 2,
// });
// restaurant.orderDelivery({
// 	address: 'Via del Sole, 21',
// 	starterIndex: 2,
// });

////////////////////////////////
// Optional chaining
// Returns an error, since the mon property does not exist (is undefined), and thus mon.open returns a TypeError.
// console.log(restaurant.openingHours.mon.open);
// Using the optional chaining operator
// console.log(restaurant.openingHours.mon?.open);
// // Multiple optional chains
// console.log(restaurant.openingHours?.mon?.open);

// // Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
// 	const open = restaurant.openingHours[day]?.open ?? 'closed';
// 	console.log(`On ${day}, we open at ${open}`);
// }

// // Using optional chaining to see if methods exist
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');

// // Using optional chaining to see if an array is empty
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// console.log(users[0]?.name ?? 'User array is empty.');

//////////////////////////////
// The for-of loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
// 	console.log(`${i + 1}: ${el}`);
// }

////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const game = {
// 	team1: 'Bayern Munich',
// 	team2: 'Borrussia Dortmund',
// 	players: [
// 		[
// 			'Neuer',
// 			'Pavard',
// 			'Martinez',
// 			'Alaba',
// 			'Davies',
// 			'Kimmich',
// 			'Goretzka',
// 			'Coman',
// 			'Muller',
// 			'Gnarby',
// 			'Lewandowski',
// 		],
// 		[
// 			'Burki',
// 			'Schulz',
// 			'Hummels',
// 			'Akanji',
// 			'Hakimi',
// 			'Weigl',
// 			'Witsel',
// 			'Hazard',
// 			'Brandt',
// 			'Sancho',
// 			'Gotze',
// 		],
// 	],
// 	score: '4:0',
// 	scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// 	date: 'Nov 9th, 2037',
// 	odds: {
// 		team1: 1.33,
// 		x: 3.25,
// 		team2: 6.5,
// 	},
// };

// // 1.
// const [players1, players2] = [...game.players];

// // 2.
// const [gk, ...fieldPlayers] = players1;

// // 3.
// const allPlayers = [...players1, ...players2];

// // 4.
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// // 5.
// const { team1, x: draw, team2 } = game.odds;

// // 6.
// function printGoals(...players) {
// 	console.log('########## PLAYERS ##########');
// 	for (let i = 0; i < players.length; i++) {
// 		console.log(players[i]);
// 	}
// 	console.log('########## GOALS ##########');
// 	console.log(players.length);
// }

// printGoals(...game.scored);

// // 7.
// game.odds.team1 > game.odds.team2 &&
// 	console.log('Team 2 is more likely to win.');
// game.odds.team1 < game.odds.team2 &&
// 	console.log('Team 1 is more likely to win.');
// // Logical Assignment Operators
// const rest1 = {
// 	name: 'Capri',
// 	numGuests: 0,
// };

// const rest2 = {
// 	name: 'La Piazza',
// 	owner: 'Giovanni Rossi',
// };

// // Establishing default values using OR short-circuiting
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// //Doing the same thing, but with the OR logical assignment operators
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// // Using ?? to account for the case where numGuests is 0
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// // Using the AND logical assignment operator
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

// Short-circuiting with the AND operator
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');
// console.log(7 && 'Jonas' && 8 && undefined && 'Hello');
// console.log(7 && 'Jonas' && 8 && 'Hello');

// Short-circuiting with the OR operator
// console.log(3 || 'Jonas');
// console.log('' || 'Erick');
// console.log(undefined || null);
// restaurant.numGuests = 0;
// restaurant.numGuests = restaurant.numGuests || 10;
// console.log(restaurant);

// The nullish coalescing operator
// restaurant.numGuestsCorrect = 0;
// restaurant.numGuestsCorrect = restaurant.numGuestsCorrect ?? 10;
// console.log(restaurant);

// // Returns 'Hello'
// console.log(undefined || 0 || '' || 'Hello' || 23 || null);
// console.log(undefined || 0 || '' || null);

// // Rest pattern
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
// 	...restaurant.mainMenu,
// 	...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

// // Rest parameters with functions
// const add = function (...numbers) {
// 	let sum = 0;
// 	for (let i = 0; i < numbers.length; i++) {
// 		sum += numbers[i];
// 	}
// 	console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// restaurant.orderPizza('Cheese', 'Pepperoni', 'Pineapple');

// // Destructuring objects
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // Using custom names
// const {
// 	name: retaurantName,
// 	openingHours: hours,
// 	categories: tags,
// } = restaurant;
// console.log(retaurantName, hours, tags);

// // Setting default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj); // The parenthesis is needed so that JS compiles this correctly.
// console.log(a, b);

// // Nested objects
// const {
// 	fri: { open, close },
// } = openingHours;
// console.log(open, close);

// The spread operator
// const arr = [7, 8, 9];
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Spread for creating shallow copies
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 arrays or more
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// const arr3 = [...arr1, ...arr2];
// console.log(arr3);

// // Strings with spread
// const str1 = 'Jonas';
// const letters = [...str1, '', 'S.'];
// console.log(letters);

// // Spread in functions
// const ingredients = [
// 	prompt("Let's make pasta! Ingredient 1?"),
// 	prompt('Ingredient 2?'),
// 	prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// restaurant.oderPasta(...ingredients);

// // Objects
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// // Shallow copies
// const copyRestaurant = { ...newRestaurant };
// copyRestaurant.foundedIn = 1500;
// copyRestaurant.mainMenu[0] = 'asdfasdf';
// console.log(copyRestaurant);

// // Array Destructuring
// const arr = [2, 3, 4];

// const [x, y, z] = arr;
// console.log(x, y, z);

// let [first, , third] = restaurant.categories;
// console.log(first, third);

// // Swapping two variables
// [first, third] = [third, first];
// console.log(first, third);

// // Destructuring the return of a function (which happens to be an array)
// console.log(restaurant.order(2, 0));
// const [starter, main] = restaurant.order(2, 0);
// console.log(starter, main);

// // Nested arrays. Getting 2, 5 and 6
// const nested = [2, 4, [5, 6]];
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Setting default values for destructured values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
