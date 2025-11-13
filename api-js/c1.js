// [personal api key]
const apiKey = "cc0cdf0c176af494f782d15285fddb86";

// Select search input & button outside the function
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

async function getWeather(city) {
  // Step 1: Get coordinates
  const geoRes = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}` // it returns a array.
  );
  const geoData = await geoRes.json();

  // print message if no city data found
  if (geoData.length === 0) {
    console.log("City not found!");
    return;
  }
  // got latitude and longitude from first website
  const { lat, lon, name, country } = geoData[0];

  // Step 2: Get weather using coordinates
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric` // it retruns a object
  );
  const weatherData = await weatherRes.json();

  // Extract data
  const temp = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const desc = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Put each into its own class
  document.querySelector(".city-name").innerHTML = `${name}, ${country}`;
  document.querySelector(".temp").innerHTML = `${Math.round(temp)}°C`;
  document.querySelector(".humidity").innerHTML = `${humidity}%`;
  document.querySelector(".wind").innerHTML = `${windSpeed} m/s`;

  document.querySelector(".weather_icon").setAttribute("src", iconUrl);

 //  Console output
  console.log(
    `📍 ${name}, ${country}\n` +
    `🌡 Temp: ${temp}°C (Feels like: ${feelsLike}°C)\n` +
    `💧 Humidity: ${humidity}%\n` +
    `🌬 Wind: ${windSpeed} km/h\n` +
    `☁️ Condition: ${desc}`
  );


}

// Search button click
searchbtn.addEventListener("click", () => {
  getWeather(searchbox.value);

});
