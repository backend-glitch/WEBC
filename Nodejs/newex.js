const express =  require('express');
const app = express();

app.use(express.json());

app.get("/",(req,res) => {

    return res.send("running successfully 🎯");
});


app.get("/about",(req,res) => {

    return res.send("I am Arjun and welcome "+req.query.name);
});


app.listen(9000,() =>{ console.log(`running on http://localhost:9000`)});