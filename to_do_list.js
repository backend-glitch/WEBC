

// Select elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
window.onload = loadTasks;

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.done));
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,   // only task text
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task function
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("⚠ Please enter a task!");
    return;
  }
  renderTask(taskText, false);
  input.value = "";
  saveTasks();
}

// Render task (create li + button)
function renderTask(taskText, isDone) {
  const li = document.createElement("li");
  li.innerText = taskText;

  if (isDone) {
    li.classList.add("done");
  }

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerText = isDone ? "✔️" : "❌";
  delBtn.classList.add("deleteBtn");

  // Mark done toggle
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    delBtn.innerText = li.classList.contains("done") ? "✔️" : "❌";
    saveTasks();
  });

  // Delete task
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggling done
    li.remove();
    saveTasks();
  });

  // Append delete button inside list item
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Add button click
addBtn.addEventListener("click", addTask);

// Press Enter to add task
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});




/*

1. Select HTML elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


document.getElementById() → finds an element by its id in the HTML.

Here:

input → the text box where we type tasks.

addBtn → the green Add Task button.

taskList → the <ul> where tasks will appear.

2. Main function → Add task
function addTask() {
  const taskText = input.value.trim();


input.value → gets the text entered in the box.

.trim() → removes extra spaces (e.g. " hello " → "hello").

3. Prevent empty tasks
  if (taskText === "") {
    alert("⚠ Please enter a task!");
    return;
  }


If the user didn’t type anything, show an alert and exit the function with return.

4. Create new <li> (list item)
  const li = document.createElement("li");
  li.innerText = taskText;


document.createElement("li") → makes a new <li>.

.innerText = taskText → sets its text to whatever the user typed.

5. Mark task as done (strike-through)
  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });


addEventListener("click", ...) → listens for a click on the <li>.

.classList.toggle("done") → adds/removes the "done" CSS class (which makes text strike-through).

6. Create Delete button
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.classList.add("deleteBtn");


Makes a <button> with ❌ text.

Adds the "deleteBtn" CSS class to style it (red button).

7. Delete functionality
  delBtn.addEventListener("click", () => {
    li.remove();
  });


When delete button is clicked → the entire <li> is removed from the list.

8. Attach delete button inside <li>
  li.appendChild(delBtn);


Adds the ❌ button inside the <li>.

9. Add task to <ul>
  taskList.appendChild(li);


Finally, append the <li> into the <ul> (taskList).

10. Clear input box
  input.value = "";
}


Reset the text box for the next task.

11. Button click = add task
addBtn.addEventListener("click", addTask);


When the green Add Task button is clicked → run addTask() function.

12. Press Enter = add task
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});


If the user presses the Enter key inside the input box → also run addTask().

✅ Summary:

Get input text.

Create <li>.

Add task text.

Add "done" toggle on click.

Add delete button.

Append everything to <ul>.

Clear input.




// local storage + JSON


🔑 Main Additions / Changes
1. Load saved tasks when page opens
// Load tasks from localStorage
window.onload = loadTasks;

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.done));
}


📌 Where: At the top of the file.
📌 What it means:

When you refresh the page, this function checks localStorage for a saved "tasks" item.

JSON.parse() converts the stored string back to an array of objects.

Each saved task is rendered back into the DOM with the renderTask() function.

2. Saving tasks after any change
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,   // only the task text
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


📌 Where: Right after loadTasks().
📌 What it means:

Collects all <li> tasks currently in the list.

Builds an array like:

[
  { "text": "Buy Milk", "done": false },
  { "text": "Study JS", "done": true }
]


Converts that array to a JSON string using JSON.stringify().

Stores it in localStorage under the key "tasks".

3. Centralized task creation function
function renderTask(taskText, isDone) {
  const li = document.createElement("li");
  li.innerText = taskText;

  if (isDone) {
    li.classList.add("done");
  }

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerText = isDone ? "✔️" : "❌";
  delBtn.classList.add("deleteBtn");

  // Mark done toggle
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    delBtn.innerText = li.classList.contains("done") ? "✔️" : "❌";
    saveTasks();
  });

  // Delete task
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggling done
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}


📌 Where: Replaces your inline <li> creation inside addTask().
📌 What it means:

Handles both new tasks and restored tasks (from storage).

Takes in two arguments: the text and whether it’s done or not.

Adds click behavior: toggle done ✅/❌ and delete.

Calls saveTasks() whenever something changes.

4. Updated addTask()
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("⚠ Please enter a task!");
    return;
  }
  renderTask(taskText, false); // new task is never done initially
  input.value = "";
  saveTasks(); // save after adding
}


📌 Change: Instead of creating <li> directly, it calls renderTask().
📌 Meaning: Keeps code clean and ensures new tasks are also saved immediately.

⚡ Summary

New: loadTasks() (restore saved tasks on refresh).

New: saveTasks() (save current tasks whenever they change).

New: renderTask() (reusable function to create tasks with buttons).

Changed: addTask() (now calls renderTask() + saves to storage).

LocalStorage: Used JSON.stringify() (save array → string) and JSON.parse() (string → array).

*/