function formatDate() {
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
function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hour = time.getHours();
  let minutes = time.getMinutes();
  return `${hour}:${minutes}`;
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");
  let city = searchInput.value;
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
  console.log(response);
  let h1 = document.querySelector("h1");
  let tempRightNow = document.querySelector("#currentTemp");
  let weatherDescriptionHeader = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let realFeelElement = document.querySelector("#real-feel");
  let highTempElement = document.querySelector("#max");
  let lowTempElement = document.querySelector("#min");
  //let date = document.querySelector("#date");
  let time = document.querySelector("#time");

  h1.innerHTML = response.data.name;
  tempRightNow.innerHTML = Math.round(response.data.main.temp);
  weatherDescriptionHeader.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  time.innerHTML = formatTime(response.data.dt * 1000);
  //date.innerHTML = formatDate(response.data.dt * 1000);
}

function displayFahrenheit() {
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `75º`;
}
function displayCelsius() {
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `24º`;
}

let today = new Date();
formatDate(today);

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let myLocation = document.querySelector("#find-my-location");
myLocation.addEventListener("click", getCurrentPosition);

let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", displayFahrenheit);

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", displayCelsius);
