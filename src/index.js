function formatTodaysDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];
  let date = today.getDate();
  let year = today.getFullYear();
  return `${day} ${month} ${date}, ${year}`;
}

function formatTimeStamp(timestamp) {
  let stamp = new Date(timestamp);
  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = week[stamp.getDay()];
  let hour = stamp.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = stamp.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
   <div class="days-of-the-week d-flex align-items-center">
      <h3>${formatTimeStamp(forecast.dt * 1000)}</h3>
      <img 
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
        alt="${forecast.weather[0].description}"
      />
      <p>${Math.round(forecast.main.temp)}º</p>
  </div>
  `;
  }
}
function displayWeatherConditions(response) {
  let cityElement = document.querySelector("#location");
  let tempRightNow = document.querySelector("#currentTemp");
  let weatherDescriptionHeader = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let realFeelElement = document.querySelector("#real-feel");
  let highTempElement = document.querySelector("#max");
  let lowTempElement = document.querySelector("#min");
  let todayHeader = document.querySelector("#date");
  let time = document.querySelector("#latest-wthr-update");
  let todayIcon = document.querySelector("#today-wthr-icon");
  let openWeatherMapIcon = response.data.weather[0].icon;
  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  tempRightNow.innerHTML = Math.round(response.data.main.temp);
  weatherDescriptionHeader.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  date.innerHTML = formatTodaysDate(new Date());
  time.innerHTML = formatTimeStamp(response.data.dt * 1000);
  todayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${openWeatherMapIcon}@2x.png`
  );
  todayIcon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let units = `metric`;
  let apiKey = `7a608a2c9f2ddbe4a22465f08c0c779a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-bar-input");
  searchCity(cityInputElement.value);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `metric`;
  let apiKey = `7a608a2c9f2ddbe4a22465f08c0c779a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
}

let celsiusTemperature = null;

let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSubmit);

let myLocation = document.querySelector("#find-my-location");
myLocation.addEventListener("click", getCurrentPosition);

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", displayFahrenheitTemp);

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", displayCelsiusTemp);

searchCity("Los Angeles");
