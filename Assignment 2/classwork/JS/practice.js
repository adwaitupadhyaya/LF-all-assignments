// const drawStars = (number = 5) => {
//   let result = "";
//   for (let i = number; i > 0; i--) {
//     result = "";
//     for (let j = 0; j < i; j++) {
//       result += "*";
//     }
//     console.log(result);
//   }
// };

// drawStars(5);

// ------------------------- //

// const personalInfo = {
//   name: "Adwait Upadhyaya",
//   address: "B-27 Rose Village, Bhaktapur",
//   emails: ["adwait627@gmail.com", "kan076bct007@kec.edu.np"],
//   interests: ["Football", "Swimming"],
//   eudcation: [
//     { name: "Rosebud School", enrolledDate: 2010 },
//     { name: "Kathmandu Model Secondary School", enrolledDate: 2017 },
//     { name: "Kantipur Engineering College", enrolledDate: 2019 },
//   ],
// };

// personalInfo.eudcation.forEach((element) => {
//   console.log(
//     `Name of education:${element.name}, Date: ${element.enrolledDate}`
//   );
// });

// ------------------------- //

// var numbers = [1, 2, 3, 4];

// JS .map array method
// const result = numbers.map((element, index, arr) => {
//   return element * 2;
// });

// console.log(result);

// custom implementation

// function transform(collection, tranFunc) {
//   const newArray = [];
//   for (let i of collection) {
//     newArray.push(tranFunc(i));
//   }
//   return newArray;
// }

// var output = transform(numbers, function (num) {
//   return num * 2;
// });

// console.log(output);

// ------------------------- //

// var arr = ["apple", "orange", "banana"];

// JS sort array method
// console.log(arr.sort());

// custom implementation

// var arr = [
//   {
//     id: 1,
//     name: "John",
//   },
//   {
//     id: 2,
//     name: "Mary",
//   },
//   {
//     id: 3,
//     name: "Andrew",
//   },
//   {
//     id: 4,
//     name: "Cat",
//   },
//   {
//     id: 5,
//     name: "Bat",
//   },
// ];

// function sortByFull(arr, key) {
//   let arrayCopy = [...arr];
//   for (let i = 0; i < arrayCopy.length; i++) {
//     for (let j = i + 1; j < arrayCopy.length; j++) {
//       if (arrayCopy[j][key].toLowerCase() < arrayCopy[i][key].toLowerCase()) {
//         let temp = arrayCopy[i][key];
//         arrayCopy[i][key] = arrayCopy[j][key];
//         arrayCopy[j][key] = temp;
//       }
//     }
//   }

//   return arrayCopy;
// }

// var sorted = sortByFull(arr, "name");

// console.log(sorted, arr);

// ------------------------- //

// Normalization

// From this
// var input = {
//   1: {
//     id: 1,
//     name: "John",
//     children: [
//       { id: 2, name: "Sally" },
//       { id: 3, name: "Mark", children: [{ id: 4, name: "Harry" }] },
//     ],
//   },
//   5: {
//     id: 5,
//     name: "Mike",
//     children: [{ id: 6, name: "Peter" }],
//   },
// };

// // To this
// var output = {
//   1: { id: 1, name: "John", children: [2, 3] },
//   2: { id: 2, name: "Sally" },
//   3: { id: 3, name: "Mark", children: [4] },
//   4: { id: 4, name: "Harry" },
//   5: { id: 5, name: "Mike", children: [6] },
//   6: { id: 6, name: "Peter" },
// };
