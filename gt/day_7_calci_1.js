let out = "";
/*
// Variables
let name = "Aman";
const age = 17;
var oldStyle = "Not recommended anymore";
out += `Name: ${name}, Age: ${age}, Var example: ${oldStyle}\n\n`;

// Data types
let num = 42;
let pi = 3.14;
let isCool = true;
let nothing = null;
let notDefined;
out += `num: ${typeof num}\npi: ${typeof pi}\nisCool: ${typeof isCool}\n`;
out += `nothing: ${typeof nothing}\nnotDefined: ${typeof notDefined}\n\n`;

// Operators
let x = 10, y = 3;
out += `x + y = ${x + y}\n`;
out += `x - y = ${x - y}\n`;
out += `x * y = ${x * y}\n`;
out += `x / y = ${x / y}\n`;
out += `x % y = ${x % y}\n`;
out += `x > y = ${x > y}\n`;
out += `x === "10" -> ${x === "10"}\n`;
out += `x == "10" -> ${x == "10"}\n\n`;

// Mini Exercise
let a = 15, b = 4;
out += `a + b = ${a + b}\n`;
out += `a - b = ${a - b}\n`;
out += `a * b = ${a * b}\n`;
out += `a / b = ${a / b}\n`;
out += `Is a > b ? ${a > b}\n`;

document.getElementById("output").innerText = out;
*/

// Calculator function
function calculate(op) {
  let n1 = parseFloat(document.getElementById("num1").value);// PARSEFLOAT : TO CONVERT STRING INTO NUMBER .
  let n2 = parseFloat(document.getElementById("num2").value);
  let result;

  if (isNaN(n1) || isNaN(n2)) {// TO CHECK IF BOTH NUMS ARE INPUTED.
    result = "⚠ Please enter both numbers";
  } else {
    switch (op) {
      case '+': result = n1 + n2; break;
      case '-': result = n1 - n2; break;
      case '*': result = n1 * n2; break;
      case '/': result = n2 !== 0 ? n1 / n2 : "⚠ Division by 0"; break;
    }
  }
  document.getElementById("result").innerText = "Result: " + result;
}
