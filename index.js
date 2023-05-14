let now = new Date();

let dates = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
let today = dates[now.getDay()];

let currentTime = now.getHours();
if (currentTime < 10) {
  currentTime = `0${currentTime}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

document.querySelector(
  "#current-date"
).innerHTML = `${today} ${currentTime} : ${currentMinutes}`;

//2
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemprature = response.data.main.temp;
  document.querySelector("#temprature").innerHTML =
    Math.round(celsiusTemprature);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFarenheitTemprature(event) {
  event.preventDefault();

  let tempratureElement = document.querySelector("#temprature");
  let farenheitTemprature = (celsiusTemprature * 9) / 5 + 32;
  //temprature = Number(temprature);
  tempratureElement.innerHTML = Math.round(farenheitTemprature);
}

function displayCelciusTemprature(event) {
  event.preventDefault();
  celciuslink.classList.add("active");
  farenheitlink.classList.remove("active");
  let tempratureElement = document.querySelector("#temprature");
  tempratureElement.innerHTML = Math.round(celsiusTemprature);
}

let celsiusTemprature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let farenheitlink = document.querySelector("#farenheit-link");
farenheitlink.addEventListener("click", displayFarenheitTemprature);

let celciuslink = document.querySelector("#celcius-link");
celciuslink.addEventListener("click", displayCelciusTemprature);

searchCity("new york");
