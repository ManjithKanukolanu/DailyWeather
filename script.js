const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function weather(city) {
  const name = city;
  const url = `https://api.openweathermap.org/data/2.5/weather?APPID=ecfcab11f4e8096ae73c257a7f7f395e&units=metric&q=${name}`;

  try {
    const data = await fetch(url);
    if (!data.ok) {
      // If the response status is not ok (like 404 or 500)
      throw new Error("City not found");
    }

    const raw = await data.json();

    // Populate the weather information
    document.querySelector(".city").innerHTML = raw.name;
    document.querySelector(".temp").innerHTML = Math.round(raw.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = raw.main.humidity + "%";
    document.querySelector(".wind").innerHTML = raw.wind.speed + " km/h";

    // Set weather icon based on weather type
    if (raw.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (raw.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.jpeg";
    } else if (raw.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.jpeg";
    } else if (raw.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.jpeg";
    } else if (raw.weather[0].main === "Snow") {
      weatherIcon.src = "images/snow.jpeg";
    } else if (raw.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.jpeg";
    }

    // Show the weather and hide the error message if no errors
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    // Show the error message and hide the weather display
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error(error);  // Log the error to the console
  }
}

// Event listener to trigger the weather function when the button is clicked
searchbtn.addEventListener("click", () => {
  const cityName = searchbox.value.trim();  // Get the value of the search box
  if (cityName) {
    weather(cityName);  // Call the weather function if input is valid
  } else {
    alert("Please enter a city name.");
  }
});

// Optional: Allow pressing "Enter" to search for weather
searchbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const cityName = searchbox.value.trim();
    if (cityName) {
      weather(cityName);
    } else {
      alert("Please enter a city name.");
    }
  }
});
