let currentTime = new Date();
function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${hours}:${minutes}`;

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${formattedDate}`;
}

console.log(currentDate(currentTime));

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchCity.value}`;
}

let changeCity = document.querySelector("#enter");
changeCity.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let change = document.querySelector("#temperature");
  change.innerHTML = `${temperature}`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humid}`;
  let percip = Math.round(response.data.main.precipitation);
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = `${percip}`;

  let suns = response.data.sys.sunset.timezone;
  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `${suns}`;

  let sunr = response.data.sys.sunrise;
  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = `${sunr}`;
}

function searchCity(city) {
  let apiKey = "2bc2f64093a701d2be588698038a4fb8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "2bc2f64093a701d2be588698038a4fb8";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(position);
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getPosition);

let tempCity = document.querySelector("#enter");
tempCity.addEventListener("submit", handleSubmit);

searchCity("Astoria");
