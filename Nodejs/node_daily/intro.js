// creating  a server.
const express = require('express');
const app = express();

// Middleware 
app.use(express.json()); // parse json bodies

//routes
app.get('/',(req,res) =>{
    res.json({msg : "Api running , Stauts : success"});
});

// to see users
app.get('/api/users',(req,res) => {
     
    res.status(200).json([
      {  id : 1, name : 'Alice' },
      {id : 2, name : 'blue'},
    ]);
});

// to add users
app.post('/api/users',(req,res) => {
    const {name} = req.body;

    res.status(201).json({id: 3,name});
});


// connecion info 
const PORT = process.env.PORT|| 3000;

app.listen(PORT,()=>{
    console.log(`Server Running at port ${PORT}`);
});