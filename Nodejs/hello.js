/*
to use node js:
npm init -y or cmd npm init -y

./math => importing from current directory
math =>  importing from built in or external package
*/

// importing and using modules
const {add, sub} = require("./math");

console.log("math value is : ", add(2,3));
console.log("math value is : ", sub(2,3));