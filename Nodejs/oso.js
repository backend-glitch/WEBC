//threads and modules

const fs = require("fs");
const os = require ("os");

//to know the number of threads
console.log(os.cpus().length);

fs.readFile("./text.txt","utf-8",(err, result) => {
   console.log(result);
})