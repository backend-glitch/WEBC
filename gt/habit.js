const habitInput = document.getElementById("habit-input");
const addBtn = document.getElementById("add-btn");
const habitList = document.getElementById("habit-list");

// Load habits from localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const div = document.createElement("div");
    div.classList.add("habit");

    div.innerHTML = `
      <span>${habit.name}</span>
      <div>
        <button class="complete-btn" onclick="markComplete(${index})">Done</button>
        <span class="streak">🔥 Streak: ${habit.streak}</span>
      </div>
    `;

    habitList.appendChild(div);
  });
}

function addHabit() {
  const name = habitInput.value.trim();
  if (name === "") return;
  
  habits.push({ name, streak: 0, lastDone: null });
  habitInput.value = "";
  saveAndRender();

  function addHabit() {
  let habitInput = document.getElementById("habitInput");
  let habitName = habitInput.value.trim();

  if (habitName === "") return;

  let li = document.createElement("li");
  li.textContent = habitName;

  // Create Delete Button
  let delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.classList.add("delete-btn");

  // Attach delete functionality
  delBtn.onclick = function () {
    li.remove();
  };

  // Add button to the list item
  li.appendChild(delBtn);

  document.getElementById("habitList").appendChild(li);

  habitInput.value = "";
}


}

function markComplete(index) {
  const today = new Date().toDateString();
  if (habits[index].lastDone === today) {
    alert("Already completed today ✅");
    return;
  }

  // If done yesterday → continue streak, else reset
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (habits[index].lastDone === yesterday.toDateString()) {
    habits[index].streak++;
  } else {
    habits[index].streak = 1;
  }
  
  habits[index].lastDone = today;
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

// Events
addBtn.addEventListener("click", addHabit);
window.onload = renderHabits;
