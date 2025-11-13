// original easy code.

// Select elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Add task function
function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("⚠ Please enter a task!");
    return;
  }

  // Create new list item
  const li = document.createElement("li");
  li.innerText = taskText;

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.classList.add("deleteBtn");

  // Mark as done on click
  li.addEventListener("click", () => {
    li.classList.toggle("done");

    // Change cross icon to tick icon
    if (li.classList.contains("done")) {
      delBtn.innerText = "✔️";
    } else {
      delBtn.innerText = "❌";
    }
  });

  // Delete task on button click
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  // Append delete button inside list item
  li.appendChild(delBtn);

  // Add list item to taskList
  taskList.appendChild(li);

  // Clear input box
  input.value = "";

  // Example of saving in localStorage
  // localStorage.setItem("score", JSON.stringify(score));
}

// Add button click
addBtn.addEventListener("click", addTask);

// Press Enter to add task
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
