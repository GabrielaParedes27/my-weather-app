//change date

let currentTime = new Date();

let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = currentTime.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agust",
  "September",
  "October",
  "November",
  "December"
];
let month = months[currentTime.getMonth()];

let updatedTime = document.querySelector("#updated-date");
updatedTime.innerHTML = `${day}, ${month} ${date} ${year} | ${hour}:${minutes}`;

// search city and update weather
function showWeatherConditions(response) {
  document.querySelector("#new-city").innerHTML =
    "📍 " + response.data.name + ", " + response.data.sys.country;
  document.querySelector("#temperature-unit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

//change city
function defaultCity(city) {
  let apiKey = "816a63a33af440332c05784e3d9896ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherConditions);
}

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  defaultCity(city);
}

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("click", newCity);

defaultCity("New York");

//change degrees
function changeCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", changeFahrenheit);

//current location and temp

function currentLocation(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  let apiKey = "816a63a33af440332c05784e3d9896ea";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showWeatherConditions);
}

function updateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let buttonCurrent = document.querySelector("#current-location");
buttonCurrent.addEventListener("click", updateLocation);
