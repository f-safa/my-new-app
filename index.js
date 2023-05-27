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

function displayForcast() {
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `<div class="col-2">
            <div class="card" width="8rem">
              <div class="card-body">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAQBJREFUaN7t2csNwyAMBmBGYYSMwhgdgxEYjRW6ARu4HNyqB0CKednElf5b2/hLSALGAICRHKMABSjgUMDdD7xfLifkxByoJOJ33O3/nwHIhVgsKDWKriXhb+0WQD6wJxZegvhlADzrcUDhpeFlpwLyAa5BZ711Na4pgAXFNxFdABw2K4r/R9iRgLiw+N89MQSATxvYFN8F2DB0qkOJCggbi/8m9AASA0AiAXBuA0ziKIDACBAogMgIECkAYBUFKEABzwOIf4yKf5HJnkqIn8wxmk775y5oxC8pj1jUH9FWEd/YOqK1eERz94j2euFqUCF7NzjYbzHpLqUCFKCAJfkAq7RimK7qUtAAAAAASUVORK5CYII="
                  alt="clear"
                  id="icon"
                />
                <h5 class="card-title">🌥</h5>
                <p class="weather-forcast-date">
                  ${day}</p>
              
                <div class="weather-forcast-temprature">
                  <span class="forcast-max"> H:21°</span> 
                  <span calss="forcast-min"> L:11°</span>
                </div>
                
              </div>
            </div>
        </div>`;
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

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
displayForcast();
