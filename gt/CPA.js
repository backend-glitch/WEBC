//1. Callback Hell 😵
//We call each step inside the previous one → it gets nested like a pyramid.

function buyVegetables(callback) {
  setTimeout(() => {
    console.log("Bought vegetables 🥕");
    callback();
  }, 1000);
}

function cookFood(callback) {
  setTimeout(() => {
    console.log("Cooked food 🍳");
    callback();
  }, 1000);
}

function eatDinner(callback) {
  setTimeout(() => {
    console.log("Ate dinner 🍽️");
    callback();
  }, 1000);
}

buyVegetables(() => {
  cookFood(() => {
    eatDinner(() => {
      console.log("Done with dinner ✅");
    });
  });
});

// ERROR
function buyVegetables(callback) {
  setTimeout(() => {
    let shopOpen = false; // ❌ change this to true to succeed
    if (shopOpen) {
      console.log("Bought vegetables 🥕");
      callback(null, "Veggies");
    } else {
      callback("Error: Shop closed 🚪", null);
    }
  }, 1000);
}

buyVegetables((error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Got:", data);
  }
});




// 2. Promises 😌

//Now each function returns a Promise.
//We chain them with .then() instead of nesting.

function buyVegetables() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Bought vegetables 🥕");
      resolve();
    }, 1000);
  });
}

function cookFood() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Cooked food 🍳");
      resolve();
    }, 1000);
  });
}

function eatDinner() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Ate dinner 🍽️");
      resolve();
    }, 1000);
  });
}

 buyVegetables()
  .then(cookFood)
  .then(eatDinner)
  .then(() => console.log("Done with dinner ✅"));

// ERRORS
function buyVegetables() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shopOpen = false; // ❌ closed
      if (shopOpen) {
        console.log("Bought vegetables 🥕");
        resolve("Veggies");
      } else {
        reject("Error: Shop closed 🚪");
      }
    }, 1000);
  });
}

buyVegetables()
  .then(data => console.log("Got:", data))
  .catch(error => console.log(error));



//3. Async/Await 🚀 (The cleanest)
//Now we write it like normal synchronous code.

  function buyVegetables() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Bought vegetables 🥕");
      resolve();
    }, 1000);
  });
}

function cookFood() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Cooked food 🍳");
      resolve();
    }, 1000);
  });
}

function eatDinner() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Ate dinner 🍽️");
      resolve();
    }, 1000);
  });
}

async function makeDinner() {
  await buyVegetables();
  await cookFood();
  await eatDinner();
  console.log("Done with dinner ✅");
}

makeDinner();

//WITH errors TRY CATCH
function buyVegetables() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shopOpen = false; // ❌ closed
      if (shopOpen) {
        console.log("Bought vegetables 🥕");
        resolve("Veggies");
      } else {
        reject("Error: Shop closed 🚪");
      }
    }, 1000);
  });
}

async function makeDinner() {
  try {
    const veggies = await buyVegetables();
    console.log("Got:", veggies);
  } catch (error) {
    console.log(error);
  }
}

makeDinner();

/*
.

🎯 What You Should Do Next

✅ Understand the flow: callback → promise → async/await

🔑 Learn Promise.all / race / any

⚡ Play with error handling & try/catch

🚀 Experiment with parallel vs sequential awaits

*/