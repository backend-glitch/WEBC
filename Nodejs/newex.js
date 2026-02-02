const express =  require('express');
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const strict = require('assert/strict');

app.use(express.json());

app.get("/",(req,res) => {

    return res.send("running successfully 🎯");
});

//middleware
app.use(express.urlencoded({extended:false}));

//M-1
app.use((req,res,next) => {

    console.log("testing middleware-1");

     req.myUserName = "Arjun";
    next();
    console.log("middleware-1:status:success");
});

//M-2

app.use((req,res,next) => {

    console.log("testing middleware-2",req.myUserName);

    //MAKING A FILE
    fs.appendFile("logm.txt",`${Date.now()}:${req.method}:${req.path}\n`,

(err,data) => {
    next();

}
    );

   
    next();

    console.log("middleware-2:status:success");
});

app.get("/api/users",(req,res) => {

    return res.json({status : "success",users});
  

});

app.get("/api/users/:id",(req,res)=>{

    const id= Number(req.params.id);
   // res.send(id);
    const user = users.find((user) => user.id === id);

    if(!user) return res.status(404).json({error : "User not Found!!"});

    return res.json(user);
});



app.post("/api/users",(req,res)=>{

    const body = req.body;

    if(!body || !body.first_name) return res.status(400).json({msg: "First name required."});

    users.push({...body,id:users.length+1});

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data) => {
        return res.status(201).json({msg:"success",id:users.length});
    })


});

app.patch("/api/users/:id",(req,res)=>{

});


// mongo db
//schema
const userschema = new mongoose.Schema({

    first_name:{

        type:String,
        required:true,
    },

    last_name:{
      type:String,
      required:false,

    },

    email:{
        type:String,
        required:true,
        unique:true,
    },
});

// live server
app.listen(9000,() =>{ console.log(`running on http://localhost:9000`)});