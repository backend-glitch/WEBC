const dogBtn = document.getElementById("dogBtn");
const dogImage = document.getElementById("dogImage");
const loading = document.getElementById("loading");
const counter = document.getElementById("counter");
const timerDisplay = document.createElement("p");
dogBtn.parentNode.insertBefore(timerDisplay, dogBtn.nextSibling); // show below button

const limit = 10;
const resetHours = 6;

// Get stored data
let count = Number(localStorage.getItem("dogCounter")) || 0;
let lastTime = Number(localStorage.getItem("dogTimestamp")) || 0;

// Check if reset needed
const now = Date.now();
if (now - lastTime > resetHours * 60 * 60 * 1000) {
  count = 0;
  lastTime = Date.now();
  localStorage.setItem("dogCounter", count);
  localStorage.setItem("dogTimestamp", lastTime);
}

updateCounter();
checkLimit();
updateTimer();

async function getDogImage() {
  if (count >= limit) return;

  try {
    loading.textContent = "Fetching dog image... 🐾";
    dogImage.src = "";

    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    dogImage.src = data.message;
    loading.textContent = "Here's your dog! 🐶";

    count++;
    lastTime = Date.now();
    localStorage.setItem("dogCounter", count);
    localStorage.setItem("dogTimestamp", lastTime);

    updateCounter();
    checkLimit();
    updateTimer();
  } catch (err) {
    loading.textContent = "❌ Failed to fetch dog image!";
    console.error(err);
  }
}

// Update counter display
function updateCounter() {
  counter.textContent = `Images fetched: ${count}/${limit}`;
}

// Disable button if limit reached
function checkLimit() {
  if (count >= limit) {
    dogBtn.disabled = true;
    dogBtn.style.backgroundColor = "#ccc";
    dogBtn.style.cursor = "not-allowed";
    loading.textContent = "🚫 Limit reached! Come back later.";
  }
}

// Update timer display
function updateTimer() {
  if (count >= limit) {
    const now = Date.now();
    const resetTime = lastTime + resetHours * 60 * 60 * 1000;
    let diff = resetTime - now;

    if (diff <= 0) {
      // Reset counter after 6 hours
      count = 0;
      lastTime = Date.now();
      localStorage.setItem("dogCounter", count);
      localStorage.setItem("dogTimestamp", lastTime);
      dogBtn.disabled = false;
      dogBtn.style.backgroundColor = "#4CAF50";
      dogBtn.style.cursor = "pointer";
      updateCounter();
      loading.textContent = "Counter reset! Click button to fetch a dog.";
      timerDisplay.textContent = "";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerDisplay.textContent = `⏱ Time until reset: ${hours}h ${minutes}m ${seconds}s`;
    setTimeout(updateTimer, 1000); // update every second
  } else {
    timerDisplay.textContent = "";
  }
}

// Button click
dogBtn.addEventListener("click", getDogImage);


