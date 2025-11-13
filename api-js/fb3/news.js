const btna = document.querySelector(".btn");
const inputa = document.querySelector(".input-btn");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const images = document.querySelector(".images");
const info = document.querySelector(".info");
const cities = document.querySelector(".cities");


const weatherkey = "cc0cdf0c176af494f782d15285fddb86";
const unsplashKey = "cyd50ABsvjzZvYOQdZM8VnT7aXDd1kwEhXvk8EbBljM";

async function getCityData(city) {
    
  try {
    info.textContent = "Loading...";
    images.innerHTML = "";
    temp.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";

    // 1️⃣ Geocoding
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherkey}`);
    const geoData = await geoRes.json();

    if (geoData.length === 0) {
      info.textContent = "City not found 😢";
      return;
    }
    console.log(geoData);
    const { lat, lon, name, country } = geoData[0];

    // 2️⃣ Weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherkey}&units=metric`
    );
    const weatherData = await weatherRes.json();

    temp.innerHTML = `<p>temp :${Math.round(weatherData.main.temp)}°C</p>`;
    wind.innerHTML = `<p>wind :</p>${weatherData.wind.speed} M/MIN`;
    humidity.innerHTML = `<p>humidity :</p>${weatherData.main.humidity}%`;

    console.log(weatherData);

    // 3️⃣ Image                                     
    const imgRes = await fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashKey}`);
    const imgData = await imgRes.json();
    const imgUrl = imgData?.urls?.regular || "https://via.placeholder.com/400x300?text=No+Image";
    images.innerHTML = `<img src="${imgUrl}" alt="${name}" style="width:100%;border-radius:10px;">`;

    console.log(imgData);

    // 4️⃣ Country Info
    const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);
    const countryData = await countryRes.json();

   console.log(countryData);

    const flag = countryData[0].flags?.png || countryData[0].flags?.svg;
    
    info.innerHTML = `
      <p><strong>${name}, ${country}</strong> 
     <img src="${flag}" width="40" style="vertical-align: middle; border-radius:5px"></p>
      <p>Capital: ${countryData[0].capital ? countryData[0].capital[0] : "N/A"}</p>
      <p>Population: ${countryData[0].population.toLocaleString()}</p>
      <p>Region: ${countryData[0].region}</p>
    `;

    cities.textContent = `Showing data for: ${name}`;

  } catch (err) {
    console.error(err);
    info.textContent = "Error fetching data. Try again!";
  }
}

// Event listeners
btna.addEventListener("click", () => {
  const city = inputa.value.trim();
  if (city) getCityData(city);
});

inputa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btna.click();
});
