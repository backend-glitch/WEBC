const container = document.getElementById("crypto-container");
const updateTime = document.getElementById("update-time");
const loading = document.getElementById("loading");
const coinSelect = document.getElementById("coinSelect");

let lastPrice = null;
let lastUpdatedTime = null;
let timerInterval = null;

async function fetchPrice() {
  const coin = coinSelect.value;
  loading.style.display = "block";

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,
      { cache: "no-cache" }
    );
    if (!res.ok) throw new Error("Failed to fetch crypto data 😢");

   const data = await res.json();

   //console.log(data);
   // console.log(data["bitcoin"].usd);

    const price = data[coin].usd;

    container.innerHTML = `
      <div class="crypto">
        <h2>${coin.replace("-", " ").toUpperCase()}</h2>
        <div class="price ${
          lastPrice
            ? price > lastPrice
              ? "up"
              : price < lastPrice
              ? "down"
              : ""
            : ""
        }">$${price}</div>
      </div>
    `;

    lastPrice = price;
    lastUpdatedTime = new Date();
    loading.style.display = "none";

    // Stop old timer before starting a new one
    if (timerInterval) clearInterval(timerInterval);

    // Start live "X seconds ago" timer
    timerInterval = setInterval(() => {
      const secondsAgo = Math.floor((new Date() - lastUpdatedTime) / 1000);
      updateTime.textContent = `Last updated ${secondsAgo} seconds ago`;
    }, 1000);
  } catch (err) {
    container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    loading.style.display = "none";
  }
}

// Fetch immediately
fetchPrice();

// Refresh every 30s
setInterval(fetchPrice, 30000);

// Update instantly on coin change
coinSelect.addEventListener("change", () => {
  lastPrice = null;
  fetchPrice();
});
