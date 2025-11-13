const jokeBtn = document.getElementById("jokeBtn");
const setupEl = document.querySelector(".setup");
const punchlineEl = document.querySelector(".punchline");
const id = document.querySelector(".id");

async function getJoke() {
  try {
    // Fetch joke data from the API
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();

    // Display the joke
    setupEl.textContent = data.setup;
    punchlineEl.textContent = data.punchline;
    id.innerHTML = data.id;

    console.log("✅ Joke fetched:", data);
  } catch (error) {
    setupEl.textContent = "Oops! Couldn't load a joke 😅";
    punchlineEl.textContent = "";
    console.error("Error fetching joke:", error);
  }
}

// Event listener for button
jokeBtn.addEventListener("click", getJoke);

jokeBtn.addEventListener(KeyboardEvent ,(e) =>{

    if(e.key() == "Enter"){
        getJoke();
    }

})
