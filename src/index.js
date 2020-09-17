function Temperature(response) {
  let roundedTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let tempRightNow = document.querySelector("#currentTemp");
  h1.innerHTML = city;
  tempRightNow.innerHTML = `${roundedTemp}º F`;
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
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `imperial`;
  let apiKey = `7a608a2c9f2ddbe4a22465f08c0c779a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(Temperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
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
}
//maybe I can put the time function inside the date function and it'll call the time function within the date function...
function formatTime(today) {
  let timeHour = today.getHours();
  let timeMinutes = today.getMinutes();
  let currentTime = `${timeHour}:${timeMinutes}`;
  let timeHeader = document.querySelector("#time");
  timeHeader.innerHTML = currentTime;
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
formatTime(today);

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let myLocation = document.querySelector("#find-my-location");
myLocation.addEventListener("click", getCurrentPosition);

let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", displayFahrenheit);

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", displayCelsius);

//let city = prompt("Enter a city?");
//city = city.toLowerCase();
//city = city.trim();
//if (weather[city] !== undefined) {
//  let temperature = weather[city].temp;
//  let humidity = weather[city].humidity;
//  let celsiusTemperature = Math.round(temperature);
//  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
//
//  alert(
//    `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
//  );
//} else {
//  alert(
//    `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//  );
//}
