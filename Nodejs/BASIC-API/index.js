// to run node: npm init -y
//and then : node hello.js
// to end the server : ctrl + c

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {

    // print this in terminal if server started successfully 
    console.log("new request received");
    // print headers if req received
    console.log(req.headers)

    // put data in the file
    const log = `${Date.now()}:${req.method}: New req recived \n ${req.url}`;

    // simpliify url
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);

    // we have to write err,result for async files
    fs.appendFile("log.txt", log, (err,data) => {
   
        
    // send response after creating the file
        //res.end("hello from backend server");

        // cases
        switch(myUrl.pathname){ // can also use req.url
            case"/":
            res.end("welcome to the homepage");
            break;

            case "/about":
                const username = myUrl.query.myname;
                res.end(`arjun_here hi ${username}`); // SYNTAX : http://localhost:8000/about?myname=ARJUN
                break;
            
            case "/search":
            const searchname = myUrl.query.searchby;
            res.end(`showing results for: ${searchname}`);
                
            default:
                res.end("error 469");
        }

// https methods:
 //GET : req.method === "GET"
 //POST
 //PATCH
 //DELETE
 //PUT

    });

    // print this in server
    //res.end("hello from backend server");

    
});

// to setup the server port
myServer.listen(8000, () => console.log("server started!!"));



