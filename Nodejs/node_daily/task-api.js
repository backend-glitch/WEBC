// task API
/*
GET    /api/tasks          - Get all tasks
GET    /api/tasks/:id      - Get single task
POST   /api/tasks          - Create new task
PUT    /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
*/

// creating  a server.

//load env variables
require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');

// Middleware 
app.use(express.json()); // parse json bodies

// middleware  - logging request info.
const logger = async (req,res,next) =>{

  //  const urlinfo = req.url;
  const loginfo = `${req.method}\t|  ${req.url} -\t|${new Date().toISOString()} \t | ${req.ip}\n`;
  
  console.log(loginfo);

  //append in the file
  try{
  fs.appendFileSync('task-api-logs.txt',loginfo);
  } catch(error){
    console.log("error writing to log file : ",error);
  }
  
  
  next(); // to move to next middleware or routes.
};

//middleware - error logs
/*
const errorlog  = async(req,res,next) =>{

    const  errormsg = `ERROR : ${new Date().toISOString()} | ${req.method} | ${req.url} | ${err.message}\n`;
    
    console.log(errormsg.trim());

    try{
        fs.append('task-api-error-log',errormsg);
    }catch(error){
        console.log(error);
    }

};
*/

//app.use(errorlog);

// to start function.
app.use(logger);

//routes
app.get('/',(req,res) =>{
    res.json("TASK-API RUNNING SUCCESSFULLY ✅");
});

//tasks list
let Tasks = ([
    {id : 1, title : 'sleeping',completed:false},
    {id: 2,title : 'study',completed:false},
    {id:3 ,title: 'code',completed:false},
    {id:4,title: 'play',completed:false},
]);

// TO GET ALL TASKS
/*
app.get('/api/tasks',(req,res) => {

    if(Tasks === null) return res.json("No tasks !!");

    //res.status(200).json(Tasks);
});
*/

app.get('/api/tasks', (req, res) => {
    let filteredTasks = Tasks;
    
    // 1. Filter by completed status
    // Usage: /api/tasks?completed=true
    if (req.query.completed !== undefined) {
        const isCompleted = req.query.completed === 'true';
        filteredTasks = filteredTasks.filter(t => t.completed === isCompleted);
    }
    
    // 2. Search by title
    // Usage: /api/tasks?search=code
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        filteredTasks = filteredTasks.filter(t => 
            t.title.toLowerCase().includes(searchTerm)
        );
    }
    
    // 3. Sort by title
    // Usage: /api/tasks?sort=asc or /api/tasks?sort=desc
    if (req.query.sort) {
        if (req.query.sort === 'asc') {
            filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (req.query.sort === 'desc') {
            filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
        }
    }
    
    // 4. Limit results
    // Usage: /api/tasks?limit=2
    if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        filteredTasks = filteredTasks.slice(0, limit);
    }
    
    res.status(200).json({
        count: filteredTasks.length,
        tasks: filteredTasks
    });
});

// to get single task
app.get('/api/tasks/:id',(req,res) => {
    
    const taskID = parseInt(req.params.id); // parseint => to convert string to integer.

    // function to find a object
    const task = Tasks.find(t => t.id === taskID);

    if(!task) return res.status(404).json({msg : "Task not found!!"});

    res.status(200).json(task);
    

});

// to create a task
app.post('/api/tasks/create',(req,res) =>{

    const{title,completed} = req.body;

    // validation
    if(!title) return res.status(400).json({error:"Title is required"});

    // create a new ID
    const newID = Tasks.length > 0 ? Math.max(...Tasks.map(t => t.id)) + 1 : 1;

    // by Default 
    const newTask = {
        id : newID,
        title ,
        completed : completed || false
    };

    Tasks.push(newTask);
    res.status(201).json("task Addded" ,newTask);

/*
tasks.map(t => t.id)           // [1, 2, 5]
...tasks.map(t => t.id)        // 1, 2, 5  // ... => unpacks the elements form the array
Math.max(1, 2, 5)              // 5
Math.max(...) + 1              // 6
*/
});

// to update the task
app.put('/api/tasks/update/:id',(req,res)=>{
    // convert input string to integer
const taskID = parseInt(req.params.id);
// find that task id
const task = Tasks.find(t => t.id === taskID);

if(!task) return res.status(404).json({error:'Task not found !!'});

// input task string
const {title,completed} = req.body;

//update tasks
if(title !== undefined) task.title  = title;
if(completed !== undefined) task.completed  = completed;

res.status(200).json(task);

});

app.delete('/api/tasks/delete/:id',(req,res) =>{
// convert input string to integer
const taskID = parseInt(req.params.id);
// find that task id
const task = Tasks.findIndex(t => t.id === taskID); // splice need  task.index not the whole task

if (task === -1) return res.status(404).json({error: 'Task not found'}); // findindex return -1 if not find.
    
const deltask = Tasks.splice(task,1); //splice(starting index,no.of elements starting from the starting index.)
res.status(200).json(deltask[0]);


});


// 404 Handler (if no route matches)
app.use((req, res) => {
    res.status(404).json({error: 'Route not found'});
});

// Error Handler (if something crashes)
app.use((err, req, res, next) => {
    console.error('ERROR:', err.message);
    res.status(500).json({error: 'Something went wrong!'});
});


// connecion info 
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT,()=>{
    console.log(`Server Running at port ${PORT}`);
});

