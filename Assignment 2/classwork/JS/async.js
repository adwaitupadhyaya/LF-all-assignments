// let todos = [];

// const ids = [1, 2, 3, 4, 5];
// const promises = [];
// console.log("loading");
// for (id of ids) {
//   const promise = fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
//   promises.push(promise);
//   promise
//     .then((response) => response.json())
//     .then((todoResponse) => {
//       todos = todoResponse;
//       console.log(todos);
//     });
// }

// Promise.all(promises).then(() => {
//   console.log("finished");
// });

async function getTodo() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response);
  } catch (error) {
    console.log(`Error happened: ${error}`);
  }
}

getTodo();
