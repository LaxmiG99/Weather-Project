function currentTime(timestamp) {
  let currentDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days = days[currentDate.getDay()];
  let day = document.querySelector(".date-container");
  day.innerHTML = days;

  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let timeIndex = document.querySelector(".am-pm");

  if (hour >= 12 && hour <= 24) {
    timeIndex.innerHTML = "PM";
  } else {
    timeIndex.innerHTML = "AM";
  }
  return `${hour}:${minute}`;
}
function displayDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row my-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
        <div class="weather-forecast-date">${displayDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temeperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "214da328b950ce6b38a3074e133f04c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//current temperature
function showTemperature(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;
  let description = response.data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  let par = document.querySelector(".weather-description");
  par.innerHTML = description;

  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let getTemperature = document.querySelector("#degree");
  getTemperature.innerHTML = temperature;
  document.querySelector(".humidity").innerHTML =
    response.data.main.humidity + "%";
  let timeElement = document.querySelector(".time-container");
  timeElement.innerHTML = currentTime(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let highestTemperature = document.querySelector(".highest");
  highestTemperature.innerHTML = Math.round(response.data.main.temp_max);
  let lowestTemperature = document.querySelector(".lowest");
  lowestTemperature.innerHTML = Math.round(response.data.main.temp_min);
  getForecast(response.data.coord);
  console.log(response.data.coord);
  console.log(response.data);
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

let form = document.querySelector("form");
form.addEventListener("submit", handleClick);
let button = document.querySelector(".btn-primary");
button.addEventListener("click", handleClick);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "214da328b950ce6b38a3074e133f04c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let current = document.querySelector(".btn-success");
current.addEventListener("click", getCurrentLocation);

//Changing metric to farenheit and back

function switchTemperatureBack() {
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentUnit = "celsius";
}

function switchTemperature() {
  let temperatureElement = document.querySelector("#degree");
  let farenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = farenheitTemperature;
  currentUnit = "fahrenheit";
}

function switchHandler(event) {
  event.preventDefault();
  if (currentUnit === "celsius") {
    switchTemperature();
  } else {
    switchTemperatureBack();
  }
}
let currentUnit = "celsius";
let celsiusTemperature = null;
let change = document.querySelector(".form-switch");
change.addEventListener("change", switchHandler);
searchCity("Winchester");
