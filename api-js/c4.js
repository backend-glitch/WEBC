const adviceText = document.querySelector(".advice-text");
const adviceId = document.querySelector(".advice-id");
const adviceBtn = document.getElementById("adviceBtn");

async function getAdvice() {
  try {
    // Start fade out
    adviceText.classList.remove("show");

    // Fetch advice from API
    const response = await fetch("https://api.adviceslip.com/advice", { cache: "no-cache" });
    const data = await response.json();

    const advice = data.slip.advice;
    const id = data.slip.id;

    // Update text after small delay (for fade effect)
    setTimeout(() => {
      adviceId.textContent = `Advice #${id}`;
      adviceText.textContent = `"${advice}"`;
      adviceText.classList.add("show");

      console.log(data);
    }, 500);
  } catch (error) {
    adviceText.textContent = "⚠️ Failed to fetch advice. Please try again.";
  }
}

adviceBtn.addEventListener("click", getAdvice);

// Load one advice on page load
getAdvice();


// API commands.
//Option	Meaning
//"default"	Browser decides (may use cache)
//"no-store"	Never use or save cache
//"reload"	Always reload from network
//"no-cache"	Check with server before using cache
//"force-cache"	Use cache if available
//"only-if-cached"	Use only cache (no network request)