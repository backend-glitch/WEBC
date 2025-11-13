// DOM NOTES + EXTRA JS TOPICS

// 1. Selecting elements
const heading = document.getElementById("main-heading");
const items = document.getElementsByClassName("list-item");
const paragraphs = document.getElementsByTagName("p");
const firstDiv = document.querySelector("div");
const allDivs = document.querySelectorAll("div");

// 2. Styling elements
heading.style.color = "red";
heading.style.backgroundColor = "black";
heading.style.fontSize = "2rem";
allDivs.forEach(div => div.style.border = "1px solid blue");

// 3. Creating and inserting elements
const newDiv = document.createElement("div");
newDiv.innerText = "Hello World";
document.body.append(newDiv);
document.body.prepend(newDiv);
heading.before(newDiv);
heading.after(newDiv);

// 4. Modifying elements
heading.innerText = "Changed Heading";
heading.textContent = "All text (even hidden)";
heading.innerHTML = "<i>Italic Heading</i>";
heading.setAttribute("title", "tooltip");
console.log(heading.getAttribute("title"));
heading.removeAttribute("title");
heading.classList.add("highlight");
heading.classList.remove("highlight");
heading.classList.toggle("highlight");
console.log(heading.classList.contains("highlight"));

// 5. Removing elements
newDiv.remove();

// 6. Traversing the DOM
const ul = document.querySelector("ul");
console.log(ul.parentNode);
console.log(ul.parentElement);
console.log(ul.closest("div"));
console.log(ul.firstElementChild);
console.log(ul.lastElementChild);
console.log(ul.children);
[...ul.children].forEach(child => console.log(child.innerText));
const firstLi = ul.firstElementChild;
console.log(firstLi.nextElementSibling);
console.log(firstLi.previousElementSibling);

// 7. Event handling
heading.onclick = () => alert("Heading clicked!");
heading.addEventListener("click", () => heading.style.color = "blue");
heading.addEventListener("click", (e) => console.log("Clicked at:", e.clientX, e.clientY));
heading.addEventListener("mouseover", () => heading.style.background = "yellow");
heading.addEventListener("mouseout", () => heading.style.background = "");
document.addEventListener("keydown", (e) => console.log("Key pressed:", e.key));

// 8. Forms and inputs
const input = document.querySelector("input");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("User typed:", input.value);
});

// 9. Dynamic list
const ulList = document.querySelector("ul");
const input_1 = document.getElementById("fruitInput");
const btn = document.querySelector("#add-btn");
btn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerText = input_1.value;
  ulList.append(li);
  input.value = "";
});

// 10. Event delegation
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("You clicked:", e.target.innerText);
  }
});

// 11. Dataset attributes
const btn_1 = document.querySelector("button");
console.log(btn_1.dataset.id);

// 12. insertAdjacentHTML
ul.insertAdjacentHTML("beforeend", "<li>Inserted Item</li>");

// 13. Cloning nodes
const clone = ul.cloneNode(true);
document.body.append(clone);

// 14. Document info
console.log(document.title);
console.log(document.URL);
console.log(document.body.childElementCount);



// =======================
// EXTRA JS TOPICS
// =======================

// 15. Callbacks
function greetUser(name, callback) {
  console.log("Hello, " + name);
  callback();
}
function bye() {
  console.log("Goodbye!");
}
greetUser("Aman", bye); // Hello Aman -> Goodbye!

// 16. Objects
const person = {
  name: "Aman",
  age: 18,
  greet: function() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
};
person.greet();
console.log(person.name);
person.city = "Delhi"; // add new property

// 17. Classes
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + " makes a sound");
  }
}
class Dog extends Animal {
  speak() {
    console.log(this.name + " barks");
  }
}
const dog1 = new Dog("Tommy");
dog1.speak(); // Tommy barks

// 18. Fetch API
// Basic fetch
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

// Fetch with async/await
async function getPost() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/2");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}
getPost();

// 19. Promises
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Promise resolved ✅");
  } else {
    reject("Promise rejected ❌");
  }
});
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done!"));


// 20. LocalStorage
// Save data
localStorage.setItem("username", "Aman");
localStorage.setItem("age", 18);

// Get data
console.log(localStorage.getItem("username"));
console.log(localStorage.getItem("age"));

// Remove specific item
localStorage.removeItem("age");

// Clear all data
// localStorage.clear();


// =======================
// 21. LocalStorage with JSON
// =======================

// Save object/array
const user = {
  name: "Aman",
  age: 18,
  hobbies: ["coding", "gaming", "music"]
};

// Convert to string before saving
localStorage.setItem("user", JSON.stringify(user));

// Get and parse back into object
const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name);   // Aman
console.log(savedUser.hobbies); // ["coding", "gaming", "music"]

// Update user data
savedUser.age = 19;
localStorage.setItem("user", JSON.stringify(savedUser));

// Remove item
localStorage.removeItem("user");
/*
💡 Rule of thumb:

JSON.stringify(obj) → convert object/array → string

JSON.parse(string) → convert string → object/array

*/
