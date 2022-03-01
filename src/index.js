let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
days = days[currentDate.getDay()];

function newDate() {
  let day = document.querySelector(".date-container");
  day.innerHTML = days;
}

newDate();

function currentTime() {
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let time = document.querySelector(".time-container");
  time.innerHTML = `${hour}:${minute}`;
  let timeIndex = document.querySelector(".am-pm");

  if (timeIndex >= 12 && timeIndex <= 24) {
    timeIndex.innerHTML = "AM";
  } else {
    timeIndex.innerHTML = "PM";
  }
}
currentTime();

//current temperature
function showTemperature(response) {
  console.log(response);
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;

  let description = response.data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  let par = document.querySelector(".weather-description");
  par.innerHTML = description;
  let temperature = Math.round(response.data.main.temp);
  let getTemperature = document.querySelector("#degree");
  getTemperature.innerHTML = temperature;
  document.querySelector(".humidity").innerHTML =
    response.data.main.humidity + "%";
}

function searchCity(city) {
  let apiKey = "214da328b950ce6b38a3074e133f04c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleClick(event) {
  event.preventDefault();
  let city = document.querySelector("#change-location").value;
  searchCity(city);
}
let button = document.querySelector(".btn-primary");
button.addEventListener("click", handleClick);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "214da328b950ce6b38a3074e133f04c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let current = document.querySelector(".btn-success");
current.addEventListener("click", getCurrentLocation);
searchCity("Winchester");

//Changing metric to farenheit
function switchTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  let farenheitTemperature = Math.round(
    (temperatureElement.innerHTML * 9) / 5 + 32
  );
  temperatureElement.innerHTML = farenheitTemperature;
  function switchTemperatureBack(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#degree");
    temperatureElement.innerHTML = 17;
  }

  let convertBack = document.querySelector(".form-switch");
  convertBack.addEventListener("change", switchTemperatureBack);
}
let change = document.querySelector(".form-switch");
change.addEventListener("change", switchTemperature);
