// function get(objName, query, errorName) {
//   if (!query) {
//     return errorName;
//   }
//   const queryParams = query.split(".");
//   let value = objName;
//   for (let i of queryParams) {
//     value = value[i]; //  obj[details][firstName][value][data]
//     if (!value) {
//       return errorName;
//     }
//   }
//   return value;
// }

// const obj = {
//   name: "John",
//   details: {
//     firstName: {
//       required: true,
//       value: "John",
//     },
//     lastName: {
//       required: false,
//       value: "Smith",
//     },
//     middleName: {
//       required: false,
//     },
//   },
//   hobbies: ["nothing"],
// };

// const firstName = get(obj, "details.firstName.value");
// console.log(firstName);

// const middleName = get(obj, "details.middleName.value", "N/A");
// console.log(middleName);

// const middleNameData = get(obj, "details.middleName.value.data");
// console.log(middleNameData);

// console.log(get(obj, " ", null));
// null;

// console.log(get(obj));
// undefined;

// console.log(get(null, null, 0));

// rest/spread operator = takes as an array
// undefined + undefined = NaN

// const arr = [1, 2, 3, 4, 5];
// let obj = {};
// const r = arr.reduce((prev, cur, index) => {
//   obj[index] = cur;
//   return obj;
// }, 0);

// console.log(r);

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
