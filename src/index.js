// Function to add a leading zero in the hours
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  let month = months[date.getMonth()];
  let numDay = addZero(date.getDate());
  let year = date.getFullYear();
  let h = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  return `${day} ${numDay}/${month}/${year}<br> Last updated: ${h}:${minutes}`;
}

let today = new Date();
let dateElement = document.querySelector("#date_time");
dateElement.innerHTML = formatDate(today);

function formatHours(timestamps) {
  // Function to add a leading zero in the hours
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let date = new Date(timestamps);
  let h = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  return `${h}:${minutes}`;
}

let form = document.querySelector("#location_form");
form.addEventListener("submit", search);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
 

  <div class="col">
          ${formatHours(forecast.dt * 1000)}
         <img src ="http://openweathermap.org/img/wn/${
           forecast.weather[0].icon
         }@2x.png"
         alt=""/>
          <div class="small-temperature">${Math.round(
            forecast.main.temp_max
          )}º | ${Math.round(forecast.main.temp_min)}º</div>
        </div>
  `;
  }
}

function defaultCity() {
  let location = "Rome";
  let mainCity = document.querySelector("#city");
  mainCity.innerHTML = location;
  let apiKey = "3b5a0f5b92d32dc7cafcc0e735ca8c5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
defaultCity();

function search(event) {
  event.preventDefault();
  let location = document.querySelector("#location_input").value;
  let mainCity = document.querySelector("#city");
  mainCity.innerHTML = location.value;
  let apiKey = "3b5a0f5b92d32dc7cafcc0e735ca8c5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchIcon = document.querySelector("#magnifying_glass");
searchIcon.addEventListener("click", search);

let temperatureScale = document.querySelector("#tempScaleC");
temperatureScale.addEventListener("click", displayTemp);

function displayTemp() {
  let temperature = document.querySelector("#temp-digit");
  temperature.innerHTML = 20;
  let celsius = document.querySelector(".degrees");
  celsius.innerHTML = "ºC";
}

let temperScale = document.querySelector("#tempScaleF");
temperScale.addEventListener("click", displayF);

function displayF() {
  let temperature = document.querySelector("#temp-digit");
  temperature.innerHTML = 68;
  let fahrenheit = document.querySelector(".degrees");
  fahrenheit.innerHTML = "ºF";
}

function showTemperature(response) {
  let tempNumber = Math.round(response.data.main.temp);
  let locationName = response.data.name;
  let mainCity = document.querySelector("#city");
  let temperature = document.querySelector("#temp-digit");
  let descriptionElement = document.querySelector("#description");
  mainCity.innerHTML = locationName;
  temperature.innerHTML = tempNumber;
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);

  displayIcon(response);

  return temperature;
}

function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let key = "3b5a0f5b92d32dc7cafcc0e735ca8c5b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  axios.get(url).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`;
  axios.get(apiUrl).then(displayForecast);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#button_current_location");
button.addEventListener("click", getPosition);

function displayIcon(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
