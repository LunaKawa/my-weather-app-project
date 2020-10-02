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
  let currentDate = `${day} ${month} ${date}, ${year}`;
  let dateHeader = document.querySelector("#date");
  dateHeader.innerHTML = currentDate;
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-bar-input");
  searchCity(cityInputElement.value);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
   <div class="days-of-the-week d-flex align-items-center">
      <h3>${formatTime(forecast.dt * 1000)}</h3>
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

function searchCity(city) {
  let units = `metric`;
  let apiKey = `7a608a2c9f2ddbe4a22465f08c0c779a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
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
  //let date = document.querySelector("#date");
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
  time.innerHTML = formatTime(response.data.dt * 1000);
  todayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${openWeatherMapIcon}@2x.png`
  );
  todayIcon.setAttribute("alt", response.data.weather[0].description);
  //date.innerHTML = formate(response.data.dt * 1000);
}
function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let today = new Date();

let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSubmit);

let myLocation = document.querySelector("#find-my-location");
myLocation.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemperature = null;

formatTodaysDate(today);

searchCity("Los Angeles");
