
//1
const toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
});

//2

const themeToggle = document.getElementById("themeToggle");
const circle = themeToggle.querySelector(".circle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.classList.toggle("active");

  if (document.body.classList.contains("light")) {
    circle.textContent = "☀️"; // Sun
  } else {
    circle.textContent = "🌙"; // Moon
  }
});
