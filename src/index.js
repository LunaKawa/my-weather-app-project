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
function formatTodaysCurrentTime(today) {
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${minutes}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let timeHeader = document.querySelector("#time");
  timeHeader.innerHTML = `${hour}:${minutes}`;
}
function searchCity(city) {
  let units = `imperial`;
  let apiKey = `7a608a2c9f2ddbe4a22465f08c0c779a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `imperial`;
  let apiKey = `7a608a2c9f2ddbe4a22465f08c0c779a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
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

  cityElement.innerHTML = response.data.name;
  tempRightNow.innerHTML = Math.round(response.data.main.temp);
  weatherDescriptionHeader.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  time.innerHTML = formatLastUpdateTime(response.data.dt * 1000);
  todayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${openWeatherMapIcon}@2x.png`
  );
  todayIcon.setAttribute("alt", response.data.weather[0].description);
  //date.innerHTML = formate(response.data.dt * 1000);
}
function formatLastUpdateTime(timestamp) {
  let time = new Date(timestamp);
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${minutes}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function displayFahrenheit() {
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `75º`;
}
function displayCelsius() {
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `24º`;
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-bar-input");
  searchCity(cityInputElement.value);
}

let today = new Date();
formatTodaysDate(today);
formatTodaysCurrentTime(today);

let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSubmit);

let myLocation = document.querySelector("#find-my-location");
myLocation.addEventListener("click", getCurrentPosition);

let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", displayFahrenheit);

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", displayCelsius);
searchCity("Los Angeles");
