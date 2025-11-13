const apiKey = "BoYweOWPFdbBncEANAgbDsx0Ea9aSL9DGhNW7z6q"; // replace with your API key if you have one
const todayBtn = document.getElementById("todayBtn");
const dateInput = document.getElementById("dateInput");
const image = document.getElementById("apod-image");
const title = document.getElementById("title");
const explanation = document.getElementById("explanation");
const dateDisplay = document.getElementById("date");

// Set max date to today
const today = new Date().toISOString().split("T")[0];
dateInput.max = today;

async function getAPOD(date = today) {
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
    if (!res.ok) throw new Error("Unable to fetch NASA APOD");
    const data = await res.json();
  // console.log(data.message);
    image.src = data.url;
    title.textContent = data.title;
    explanation.textContent = data.explanation;
    dateDisplay.textContent = `📅 Date: ${data.date}`;
  } catch (err) {
    title.textContent = "Error 😢";
    explanation.textContent = err.message;
    image.src = "";
  }
}

// Event listeners
todayBtn.addEventListener("click", () => getAPOD());
dateInput.addEventListener("change", (e) => getAPOD(e.target.value));

// Load today's picture by default
getAPOD();
