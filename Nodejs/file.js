// file handling

const fs = require("fs");
const { deflate } = require("zlib");

// creating file
// sync file
fs.writeFileSync("./text.txt","hey there !!");

//Async file
fs.writeFile("./text1.exe","sync hi!!", (err) => {});

// read a file
 fs.readFileSync("./text.txt","utf-8");

//read a Aynsc file
fs.readFile("./text1.exe","utf-8",(err,result) => {});
//if(err){
   // console.log("error",err);
//}else{
   // console.log(result);
//}


// to append
fs.appendFileSync("./text.txt",`${Date.now()}_Hey There2\n`);

//to make a copy
fs.cpSync("./text.txe","./copy.txt");

// to delete a file
fs.unlinkSync("./copy.txt");

//to create a folder
fs.mkdirSync("afolder");


 