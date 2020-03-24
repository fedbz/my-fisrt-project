// Function to add a leading zero in the hours
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let today = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[today.getDay()];

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
let month = months[today.getMonth()];
let date = today.getDate();
let year = today.getFullYear();
let h = addZero(today.getHours());
let minutes = addZero(today.getMinutes());

let dateElement = document.querySelector("#date_time");
dateElement.innerHTML = `${day} ${date}/${month}/${year}<br> ${h}:${minutes}`;

let form = document.querySelector("#location_form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let location = document.querySelector("#location_input").value;
  let mainCity = document.querySelector("#city");
  mainCity.innerHTML = location.value;
  let apiKey = "3b5a0f5b92d32dc7cafcc0e735ca8c5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
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
  console.log(response.data);
  let tempNumber = Math.round(response.data.main.temp);
  let locationName = response.data.name;
  let mainCity = document.querySelector("#city");
  let temperature = document.querySelector("#temp-digit");
  mainCity.innerHTML = locationName;
  temperature.innerHTML = tempNumber;

  return temperature;
}

function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let key = "3b5a0f5b92d32dc7cafcc0e735ca8c5b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  axios.get(url).then(showTemperature);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#button_current_location");
button.addEventListener("click", getPosition);
