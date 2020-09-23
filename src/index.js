function formatDate(today) {
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
  debugger;
  formatTime(today);
}
function formatTime(today) {
  let timeHour = today.getHours();
  let timeMinutes = today.getMinutes();
  let currentTime = `${timeHour}:${timeMinutes}`;
  let timeHeader = document.querySelector("#time");
  timeHeader.innerHTML = currentTime;
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");
  let city = searchInput.value;
  let units = `imperial`;
  let apiKey = `7a608a2c9f2ddbe4a22465f08c0c779a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(Temperature);
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
  axios.get(apiUrl).then(Temperature);
}
function Temperature(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let tempRightNow = document.querySelector("#currentTemp");
  h1.innerHTML = city;
  tempRightNow.innerHTML = `${roundedTemp}º F`;
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
