let out = "";

// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}
out += greet("Aman") + "\n";

// Function expression
const square = function(num) {
  return num * num;
};
out += `Square of 5 = ${square(5)}\n`;

// Arrow function
const add = (a, b) => a + b;
out += `2 + 3 = ${add(2, 3)}\n`;

// DOM basics
document.getElementById("output").innerText = out;

// ----------------------
// Mini Project: Counter
// ----------------------
let count = 0;

function updateDisplay() {
  document.getElementById("count").innerText = count;
}

function increment() {
  count++;
  updateDisplay();
}

function decrement() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

/*toggle */
const title = document.getElementById("title");

title.addEventListener("click", () => {
  title.classList.toggle("active");
});

