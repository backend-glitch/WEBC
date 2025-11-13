const todo_list = [
    {
   name : 'study',
   dueDate : '2025-09-08'
}
];

rendertodolist();

let todolisthtml = '';

function rendertodolist(){

let todolisthtml = '';


// todisplay in the div.
for(let i = 0;i<todo_list.length;i++){
const todoobject = todo_list[i];

// const name = todoobject.name;;
//const dueDate = todoobject.dueDate

// shortcut
const{ name, dueDate } = todoobject;

const html = `<div>${name}</div>
  <div> ${dueDate} </div> 
<button onclick = "todo_list.splice(${i},1); # to delete that part
rendertodolist();
"
<button class = "delete-btn">DELETE</button> 
`; // ADDING DELETE BUTTON FOR EACH array.

todolisthtml += html;
}

console.log(todolisthtml);

// ADDING TODOLISTHTML ARRAY IN THE DIV-.JS_TODO.
document.querySelector('.jstodo')
 .innerHTML = todolisthtml;

}

function add_todo(){
    
 const input_element =  document.querySelector('.todo_name');
  const input_date = document.querySelector('.js_date');


  const dueDate = input_date.value;
 const name = input_element.value;

 todo_list.push(
    {
    name: name,
    dueDate: dueDate
 } 
);

 console.log(todo_list);

 // to make input blank everytime after taking input.
 input_element.value = ' ';

 rendertodolist();

/*
 // if input is empty.
 if (name === ""){  
   // input_element.value = '!enter_something!';
  console.log('!enter_something!');
    return;
 }
*/
}
