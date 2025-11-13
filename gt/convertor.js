const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");

// Load currency list from Frankfurter API
async function loadCurrencies() {
  try {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const symbols = await res.json();

    // Populate dropdowns
    for (let code in symbols) {
      let opt1 = document.createElement("option");
      opt1.value = code;
      opt1.textContent = `${code} - ${symbols[code]}`;
      fromCurrency.appendChild(opt1);

      let opt2 = opt1.cloneNode(true);
      toCurrency.appendChild(opt2);
    }

    // Default selection
    fromCurrency.value = "USD";
    toCurrency.value = "INR";

  } catch (err) {
    console.error("Error loading currencies:", err);
    alert("⚠ Could not load currency list. Try again later.");
  }
}

// Convert currency using Frankfurter API
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    alert("⚠ Enter a valid amount!");
    return;
  }

  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    const data = await res.json();

    const converted = data.rates[to];
    resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    console.error("Conversion failed:", err);
    resultDiv.innerText = "⚠ Conversion failed. Try again.";
  }
}

// Event listener
convertBtn.addEventListener("click", convertCurrency);

// Load currencies when page starts
loadCurrencies();


/*
💡 Rule of thumb:

If you have an object → for...in.

If you have an array or iterable → for...of.

*/