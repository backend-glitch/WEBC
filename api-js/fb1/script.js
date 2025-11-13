const btn = document.getElementById("getPriceBtn");
const output = document.getElementById("output");
const updateTime = document.getElementById("updateTime");

btn.addEventListener("click", async () => {
  const coin = document.getElementById("coinInput").value.trim().toLowerCase();
  if (!coin) {
    output.textContent = "⚠️ Please enter a coin name!";
    return;
  }

  output.textContent = "⏳ Fetching price...";

  try {
    const res = await fetch(`http://localhost:3000/crypto?coin=${coin}`);
    const data = await res.json();
   // console.log(data.bitcoin);
   console.log(data);

    if (data.error || !data[coin]) {
      output.textContent = "❌ Coin not found!";
      return;
    }

    const price = data[coin].usd;
    output.textContent = `💰 ${coin.toUpperCase()} Price: $${price}`;

    const now = new Date();
    updateTime.textContent = `Last updated at: ${now.toLocaleTimeString()}`;
  } catch (err) {
    output.textContent = "⚠️ Failed to fetch data.";
    console.error(err);
  }
});
