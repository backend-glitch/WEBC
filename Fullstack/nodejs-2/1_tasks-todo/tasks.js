// tasks todo systemm

// importing
const fs = require('fs');
const filePath = "./tasks.json";

// arguments
const command = process.argv[2];
const argument = process.argv[3];

// methods

const loadTasks = () =>{
try{

    const dataBuffer = fs.readFileSync(filePath); // this gives data buffer
    const dataJSON = dataBuffer.toString(); // converts binary BUFFER to dataJSON
    return JSON.parse(dataJSON); // CONVERTS String to json format


}catch(error){
   return [];
}
}

const saveTasks = (tasks) => {
   const dataJSON  =  JSON.stringify(tasks); // converts data taken terminal into string
   fs.writeFileSync(filePath , dataJSON);

}


const addTasks = (task) =>{
  const tasks = loadTasks();
  tasks.push({task}); // converts to object form
  saveTasks(tasks);
}

const listTasks = () => {
    const tasks = loadTasks();

    tasks.forEach((task,index) => {
        console.log(`${index+1} - ${task.task}`);
    });
}

const removeTasks = (task) => {
    const tasks = loadTasks();

    tasks.splice(tasks.indexOf(task), 1); // indexof(index) => finds the index of that task , 1 => removes one elemnet stariting from that index
    saveTasks(tasks);
}
// cmds
if(command == "add"){
    addTasks(argument);
}else if(command == "list"){
    listTasks();
}else if(command == "remove"){
   removeTasks(argument);
}else{
    console.log("cmd not found !!");
}

